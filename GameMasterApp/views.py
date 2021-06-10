from django.contrib.auth import authenticate
from django.db.models import Sum
from django.shortcuts import render
from django.utils.timezone import get_current_timezone
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication  # noqa F401
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from rest_framework.response import Response

from GameMasterApp.handlers.UserHandlerProxy import UserHandlerProxy
from GameMasterApp.models import *
from datetime import datetime, date, time, timedelta, timezone
from GameMasterApp.serializers import LotterySerializer, TicketIDSerializer, UserSerializer
import logging
import linecache
import json
import inspect
import os
import sys


logger = logging.getLogger(__name__)

class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return

def return_lineno_filename_file_called_exception():
    exc_type, exc_obj, tb = sys.exc_info()
    frame = tb.tb_frame
    lineno = tb.tb_lineno
    filename = frame.f_code.co_filename
    linecache.checkcache(filename)
    line = linecache.getline(filename, lineno, frame.f_globals)

    return exc_obj, lineno, filename, line


def raise_exception(message=''):
    callerframerecord = inspect.stack()[1]
    frame = callerframerecord[0]
    info = inspect.getframeinfo(frame)
    function_name = info.function
    line_no = info.lineno
    try:
        exc_obj, lineno, filename, line = return_lineno_filename_file_called_exception()
        logger.error(message + " [ERROR] %s at %s in function %s",
                     exc_obj, lineno, function_name)
    except:
        logger.error(message + " [ERROR] of function %s at %s",
                     function_name, line_no)


def raise_info(message=''):
    try:
        exc_obj, lineno, filename, line = return_lineno_filename_file_called_exception()
        logger.info(message + " [INFO] %s at %s ",exc_obj, lineno)
    except:
        callerframerecord = inspect.stack()[1]
        frame = callerframerecord[0]
        info = inspect.getframeinfo(frame)
        function_name = info.function
        line_no = info.lineno
        logger.info(message + " [INFO] of function %s at %s",
                    function_name, line_no)




class BuyTicketsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = {}
        try:
            raise_info("Start of BuyTicketsAPI")
            data = request.data
            lotteries = Lottery.objects.filter(id__in=data["selected_lotteries"], completed=False)
            data = data["selection"]
            tickets_created = []
            user = request.user
            points = 0
            for key, value in data.items():
                if (value['quantity'] != None):
                    points += value["quantity"] * value["price"]

            if (points > user.balance_points):
                response['status_code'] = 500
                response['message'] = "Not enough points"
                raise_exception("Not enough points")
                raise Exception("Not enough points")

            if (points <= 0):
                response['status_code'] = 500
                response['message'] = "Please select tickets before buying"
                raise_exception("Please select tickets before buying")
                raise Exception("Please select tickets before buying")

            if(points < 10):
                response['status_code'] = 500
                response['message'] = "Minimum total should be 10 points"
                raise_exception("Minimum total should be 10 points")
                raise Exception("Minimum total should be 10 points")

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
                    #user.save()
                    if user.user_type == "Agent":
                        agent_obj = Agent.objects.filter(user=user)
                        if agent_obj:
                            commission_percent = agent_obj[0].commission_percent
                            user.balance_points += points*(commission_percent/100)
                    user.save()
                    ticket_id.save()
                    tickets_created.append(ticket_id)
                tickets_created = TicketIDSerializer(tickets_created,many=True).data
            else:
                response['status_code'] = 500
                response['message'] = "Please select tickets before buying"
                raise_exception("Please select tickets before buying")
                raise Exception("Please select tickets before buying")
            response['status_code'] = 200
            response['tickets'] = tickets_created
            response['balance_points'] = user.balance_points

            raise_info("End of BuyTicketsAPI")
            return Response(data=response)
        except:
            raise_exception("BuyTicketsAPI")
            return Response(data=response, status=status.HTTP_200_OK)


BuyTickets = BuyTicketsAPI.as_view()


class LotteryTimingsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        response = {}
        response['status_code'] = 500
        try:
            raise_info("Enter Lotter Timing APIS")
            if "start_date" in request.query_params and "end_date" in request.query_params:
                today_min = datetime.strptime(request.query_params["start_date"] + " 00:00:00", '%Y-%m-%d %H:%M:%S')
                today_max = datetime.strptime(request.query_params["end_date"] + " 23:59:00", '%Y-%m-%d %H:%M:%S')
                print(today_max)
                print(today_min)
            else:
                today_min = datetime.combine(date.today(), time.min)
                today_max = datetime.combine(date.today() + timedelta(days=1), time.min)
            current_time = get_current_timezone().localize(datetime.now())
            closest_time = Lottery.objects.filter(time__gte=current_time).first()
            response['closest_lottery'] = LotterySerializer(closest_time).data
            timings_of_lottery = Lottery.objects.filter(time__gte=today_min,time__lt = today_min).order_by('time')
            timings_of_lottery = LotterySerializer(timings_of_lottery, many=True).data
            response["lottery_objects"] = timings_of_lottery
            response['status_code'] = 200
        except:
            raise_exception("LotteryTimingsAPI")
            response = json.dumps(response)
        raise_info("Leaves Lotter Timing APIS")
        return Response(data=response)


LotteryTimings = LotteryTimingsAPI.as_view()


class LotteryWinnersAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            response = {}
            response['status_code'] = 500
            raise_info("Enter Lottery Winners APIS")
            data = request.data
            lottery_id = data["lottery_id"]
            lottery_obj = Lottery.objects.get(pk=lottery_id)
            if lottery_obj:
                raise_info(f"current api time is{lottery_obj.time}")
                lottery_winners_ticket = LotterySerializer(lottery_obj).data["winners"]
            else:
                lottery_winners_ticket = []
            response['announcements'] = Announcement.objects.all().values_list('message')
            response['lottery_winners_ticket'] = lottery_winners_ticket
            response['status_code'] = 200
        except:
            raise_exception("LotteryWinnersAPI")
            response = json.dumps(response)
        raise_info("End of Lottery winners api")
        return Response(data=response)


LotteryWinners = LotteryWinnersAPI.as_view()


class LotteryWinnersPreviousAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = {}
        response['status_code'] = 500
        try:
            raise_info("Start of LotteryWinnersPreviousAPI")
            data = request.data
            lottery_time = data["lottery_time"]
            date_object = datetime.fromtimestamp(int(lottery_time) / 1000)
            lottery_obj = Lottery.objects.filter(time__lte=date_object)
            raise_info(f"lottery previous is {lottery_obj}")
            if lottery_obj:
                raise_info(lottery_obj.last().time)
                lottery_winners_ticket = json.loads(lottery_obj.last().winners)
                raise_info(lottery_winners_ticket)
            else:
                lottery_winners_ticket = []
            response['lottery_winners_ticket'] = lottery_winners_ticket
            response['status_code'] = 200
        except:
            raise_exception("LotteryWinnersPreviousAPI")
            response = json.dumps(response)
        raise_info("End of LotteryWinnersPreviousAPI")
        return Response(data=response)


LotteryWinnersPrevious = LotteryWinnersPreviousAPI.as_view()


class TotalDebitCreditView(APIView):

    def post(self, request):
        try:
            raise_info("Start of TotalDebitCreditView")
            data = request.data
            response = {}
            response_objects = TicketID.objects.filter(user=request.user,cancelled=False)
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
        except:
            raise_exception("TotalDebitCreditView")
            response = json.dumps(response)
        raise_info("End of TotalDebitCreditView")
        return Response(data=response)


TotalPointsView = TotalDebitCreditView.as_view()


class TicketIdView(APIView):

    def get(self, request):
        response_objects = TicketID.objects.filter(user=request.user,cancelled=False).order_by('-created_at')
        print(response_objects)
        return Response(data=TicketIDSerializer(response_objects, many=True).data)


TicketIDAsView = TicketIdView.as_view()


class CancelTicketAPI(APIView):
    def post(self, request):
        response = {}
        try:
            raise_info("Start of CancelTicketAPI")
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
            raise_exception("CancelTicketAPI")
            response['status_code'] = 500
            response['message'] = str(e)
        raise_info("End of CancelTicketAPI")
        return Response(data=response)

CancelTicketView = CancelTicketAPI.as_view()

class ClaimTicketAPI(APIView):
    def post(self, request):
        response = {}
        response['status_code'] = 500
        try:
            raise_info("Start of ClaimTicketAPI")
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
        except:
            raise_exception("ClaimTicketAPI")
        raise_info("End of ClaimTicketAPI")
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
