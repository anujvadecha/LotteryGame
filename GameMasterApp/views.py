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
from datetime import datetime, date, time, timedelta
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
            lotteries = Lottery.objects.filter(id__in=data["selected_lotteries"] ,completed = False)
            data = data["selection"]
            tickets_created = []
            user=request.user
            # Validation for balance points
            points=0
            for key, value in data.items():
                if (value['quantity'] != None):
                    points += value["quantity"]*value["price"]

            if(points > user.balance_points):
                response['status_code'] = 500
                response['message'] = "Not enough points"
                raise Exception("Not enough points")
            if(points<=0):
                response['status_code'] = 500
                response['message'] = "Please select tickets before buying"
                raise Exception("Please select tickets before buying")
            if (len(data) > 0):
                for lottery in lotteries:
                    ticket_id = TicketID.objects.create(user=user, lottery=lottery)
                    for key, value in data.items():
                        if (value['quantity'] != None):
                            ticket = Ticket.objects.create(user=user, set_ticket=key, quantity=value["quantity"],
                                                           price=value["price"], lottery=lottery)
                            ticket_id.ticket_set.add(ticket)
                            ticket_id.increase_outflow(value["price"])

                    user.balance_points -= points
                    user.save()
                    ticket_id.save()
                    tickets_created.append(TicketIDSerializer(ticket_id).data)
            else:
                response['status_code'] = 500
                response['message'] = "Please select tickets before buying"
                raise Exception("Please select tickets before buying")
            response['status_code'] = 200
            response['tickets'] = tickets_created
            response['balance_points'] = user.balance_points

            print(response)
            return Response(data=response)
        except:

            return Response(data = response ,status = status.HTTP_200_OK)
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
            except:
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

            timings_of_lottery = Lottery.objects.filter(time__range=(today_min, today_max))
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
        response_objects = TicketID.objects.filter(user=request.user)
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
        response["balance_points"]=request.user.balance_points
        if(Agent.objects.filter(user=request.user).count()!=0):
            response["commission"] = Agent.objects.filter(user=request.user).first().commission_percent
        response["user"]=UserSerializer(request.user).data
        return Response(data=response)


TotalPointsView = TotalDebitCreditView.as_view()


class TicketIdView(APIView):

    def get(self,request):
        response_objects=TicketID.objects.filter(user=request.user)
        return Response(data=TicketIDSerializer(response_objects,many=True).data)

TicketIDAsView=TicketIdView.as_view()
