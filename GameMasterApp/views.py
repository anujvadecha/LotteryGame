from django.contrib.auth import authenticate
from django.db.models import Sum
from django.shortcuts import render
from django.utils.timezone import get_current_timezone
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication  # noqa F401
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from rest_framework.response import Response

from GameMasterApp.handlers.UserHandlerProxy import UserHandlerProxy
from GameMasterApp.models import *
from datetime import datetime, date, time, timedelta, timezone
from GameMasterApp.serializers import LotterySerializer, TicketIDSerializer, UserSerializer


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return


class BuyTicketsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = {}
        try:
            data = request.data
            lotteries = Lottery.objects.filter(id__in=data["selected_lotteries"], completed=False)
            data = data["selection"]
            tickets_created = []
            user = request.user
            # Validation for balance points
            points = 0
            for key, value in data.items():
                if (value['quantity'] != None):
                    points += value["quantity"] * value["price"]

            if (points > user.balance_points):
                response['status_code'] = 500
                response['message'] = "Not enough points"
                raise Exception("Not enough points")

            if (points <= 0):
                response['status_code'] = 500
                response['message'] = "Please select tickets before buying"
                raise Exception("Please select tickets before buying")

            if (len(data) > 0):
                for lottery in lotteries:
                    ticket_id = TicketID.objects.create(user=user, lottery=lottery)
                    tickets_to_create=[]
                    for key, value in data.items():
                        if (value['quantity'] != None):
                            ticket = Ticket(user=user, set_ticket=key, quantity=value["quantity"],
                                                           price=value["price"], lottery=lottery,number=key[1:] ,total=value['quantity']*value['price'] )
                            ticket_id.increase_outflow(value["price"]*value['quantity'])
                            tickets_to_create.append(ticket)
                    bulk_created = Ticket.objects.bulk_create(tickets_to_create)
                    ticket_id.ticket_set.add(*bulk_created)
                    user.balance_points -= points
                    user.save()
                    ticket_id.save()
                    tickets_created.append(ticket_id)
                tickets_created = TicketIDSerializer(tickets_created,many=True).data
            else:
                response['status_code'] = 500
                response['message'] = "Please select tickets before buying"
                raise Exception("Please select tickets before buying")
            response['status_code'] = 200
            response['tickets'] = tickets_created
            response['balance_points'] = user.balance_points

            print(response)
            return Response(data=response)
        except Exception as e:
            raise e
            return Response(data=response, status=status.HTTP_200_OK)


BuyTickets = BuyTicketsAPI.as_view()


class LotteryTimingsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        response = {}
        response['status_code'] = 500
        try:
            print(request.query_params)
            try:
                print(request.query_params)
            except Exception as e:
                print(str(e))
            if "start_date" in request.query_params and "end_date" in request.query_params:
                today_min = datetime.strptime(request.query_params["start_date"] + " 00:00:00", '%Y-%m-%d %H:%M:%S')
                today_max = datetime.strptime(request.query_params["end_date"] + " 23:59:00", '%Y-%m-%d %H:%M:%S')
                print(today_max)
                print(today_min)
            else:
                today_min = datetime.combine(date.today(), time.min)
                today_max = datetime.combine(date.today() + timedelta(days=1), time.max)
            current_time = get_current_timezone().localize(datetime.now())
            closest_time = Lottery.objects.filter(time__gte=current_time).first()
            response['closest_lottery'] = LotterySerializer(closest_time).data
            timings_of_lottery = Lottery.objects.filter(time__range=(today_min, today_max)).order_by('time')
            timings_of_lottery = LotterySerializer(timings_of_lottery, many=True).data
            response["lottery_objects"] = timings_of_lottery
            response['status_code'] = 200
        except Exception as e:
            print(e)
            response = json.dumps(response)
        return Response(data=response)


LotteryTimings = LotteryTimingsAPI.as_view()


class LotteryWinnersAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = {}
        response['status_code'] = 500
        # try:
        data = request.data
        lottery_id = data["lottery_id"]
        lottery_obj = Lottery.objects.get(pk=lottery_id)
        if lottery_obj:
            print(f"current api time is{lottery_obj.time}")
            lottery_winners_ticket = LotterySerializer(lottery_obj).data["winners"]
        else:
            lottery_winners_ticket = []
        response['announcements'] = Announcement.objects.all().values_list('message')
        response['lottery_winners_ticket'] = lottery_winners_ticket
        response['status_code'] = 200
        return Response(data=response)


LotteryWinners = LotteryWinnersAPI.as_view()


class LotteryWinnersPreviousAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = {}
        response['status_code'] = 500
        try:
            data = request.data
            lottery_time = data["lottery_time"]
            date_object = datetime.fromtimestamp(int(lottery_time) / 1000)
            lottery_obj = Lottery.objects.filter(time__lte=date_object)
            print(f"lottery previous is {lottery_obj}")
            if lottery_obj:
                print(lottery_obj.last().time)
                lottery_winners_ticket = json.loads(lottery_obj.last().winners)
                print(lottery_winners_ticket)
            else:
                lottery_winners_ticket = []
            response['lottery_winners_ticket'] = lottery_winners_ticket
            response['status_code'] = 200
        except Exception as e:
            print(e)
            response = json.dumps(response)
        return Response(data=response)


LotteryWinnersPrevious = LotteryWinnersPreviousAPI.as_view()


class TotalDebitCreditView(APIView):

    def post(self, request):
        data = request.data
        response = {}
        response_objects = TicketID.objects.filter(user=request.user,cancelled=False)
        print(request.data)
        if (data.get("start_date", None) and data.get("end_date", None)):
            response_objects = response_objects.filter(created_at__date__gte=data.get("start_date"),
                                                       created_at__date__lte=data.get("end_date"))
        else:
            response_objects = response_objects.filter(created_at__date=datetime.now().date())
        response_debit = response_objects.aggregate(Sum('inflow'))["inflow__sum"]
        response_credit = response_objects.aggregate(Sum('outflow'))["outflow__sum"]
        if response_debit == None:
            response_debit = 0
        if response_credit == None:
            response_credit = 0
        response["inflow"] = response_debit
        response["outflow"] = response_credit
        response["balance_points"] = request.user.balance_points
        if (Agent.objects.filter(user=request.user).count() != 0):
            response["commission"] = Agent.objects.filter(user=request.user).first().commission_percent
        response["user"] = UserSerializer(request.user).data
        return Response(data=response)


TotalPointsView = TotalDebitCreditView.as_view()


class TicketIdView(APIView):

    def get(self, request):
        response_objects = TicketID.objects.filter(user=request.user,cancelled=False).order_by('-created_at')
        return Response(data=TicketIDSerializer(response_objects, many=True).data)


TicketIDAsView = TicketIdView.as_view()


class CancelTicketAPI(APIView):
    def post(self, request):
        response = {}
        try:
            data = request.data
            cancelled_ticket_id = data['cancelled_ticket_id']
            todays_date= date.today()
            cancelled_count = TicketID.objects.filter(user=request.user,modified_at__date = todays_date,cancelled=True).count()
            if(cancelled_count >= 10):
                raise Exception("Cancelled limit reached")
            ticket_obj = TicketID.objects.filter(pk=cancelled_ticket_id , lottery__completed=False)
            if ticket_obj:
                ticket_obj = ticket_obj.first()
                ticket_obj.cancelled = True
                ticket_obj.save()
                user_obj = request.user
                user_obj.balance_points = user_obj.balance_points + ticket_obj.total_price
                user_obj.save()
                response['status_code'] = 200
            else:
                response['status_code'] = 300
        except Exception as e:
            print(e)
            response['status_code'] = 500
            response['message'] = str(e)
        return Response(data=response)

CancelTicketView = CancelTicketAPI.as_view()

class ClaimTicketAPI(APIView):
    def post(self, request):
        response = {}
        response['status_code'] = 500
        try:
            data = request.data
            ticket_id = data['ticket_id']
            ticket_obj = TicketID.objects.filter(ticket_id=ticket_id,cancelled=False,is_completed=False)
            if ticket_obj:
                if ticket_obj.filter(user=request.user):
                    ticket_obj = ticket_obj[0]
                    if ticket_obj.inflow > 0:
                        ticket_obj.is_completed = True
                        ticket_obj.save()
                        response["ticket"] = TicketIDSerializer(ticket_obj).data
                        response['status_code'] = 200
                    else:
                        response['status_code'] = 305
                        response['status_message'] = "No wins."
                else:
                    response['status_code'] = 302
                    response['status_message'] = "Ticket does not belong to this booth."

            else:
                response['status_code'] = 300
                response['status_message'] = "Ticket has already been claimed or does not exists."
        except Exception as e:
            print(e)
        return Response(response)

ClaimTicketView = ClaimTicketAPI.as_view()



class UserAuthentication(APIView):

    def post(self,request):
        user = User.objects.filter(mobile=request.data['mobile']).first()
        authentication = authenticate(username=user.username,password=request.data['password'])
        if authentication is not None:
            return Response(data={"token": ""},status=status.HTTP_200_OK)
        else:
            return Response(data="failed",status=status.HTTP_400_BAD_REQUEST)
