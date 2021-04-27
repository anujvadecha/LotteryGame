from django.shortcuts import render
from django.utils.timezone import get_current_timezone
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication   # noqa F401
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, HttpResponse,HttpResponseRedirect
from rest_framework.response import Response
from GameMasterApp.models import *
from datetime import datetime, date, time, timedelta
from GameMasterApp.serializers import LotterySerializer, TicketIDSerializer


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return

class BuyTicketsAPI(APIView):

    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        response = {}
        data = request.data
        print(data)

        lotteries = Lottery.objects.filter(id__in = data["selected_lotteries"])
        data = data["selection"]
        tickets_created=[]
        if (len(data) > 0):
            for lottery in lotteries:
                ticket_id = TicketID.objects.create(user=request.user,lottery=lottery)
                for key,value in data.items():
                    if(value['quantity']!=None):
                        ticket = Ticket.objects.create(user=request.user,set_ticket=key,quantity=value["quantity"],price=value["price"],lottery=lottery)
                        ticket_id.ticket_set.add(ticket)
                        UserLedgerHistory.objects.create(user=request.user,credit=value["quantity"] * value["price"],debit=0,ticket_individual=ticket)

                ticket_id.save()
                tickets_created.append(TicketIDSerializer(ticket_id).data)
        response['status_code'] = 200
        response['tickets'] = tickets_created
        return Response(data=response)

BuyTickets = BuyTicketsAPI.as_view()


class LotteryTimingsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        response = {}
        response['status_code'] = 500
        try:
            current_time = get_current_timezone().localize(datetime.now())
            closest_time = Lottery.objects.filter(time__gte=current_time).first()
            response['closest_lottery'] = LotterySerializer(closest_time).data
            today_min = datetime.combine(date.today(), time.min)
            today_max = datetime.combine(date.today()+timedelta(days=1), time.max)
            timings_of_lottery = Lottery.objects.filter(time__range=(today_min, today_max))
            timings_of_lottery = LotterySerializer(timings_of_lottery,many=True).data
            response["lottery_objects"] =timings_of_lottery
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
        lottery_time = data["lottery_time"]
        date_object = datetime.fromtimestamp(int(lottery_time)/1000)
        print(f"date_object{date_object}")
        lottery_obj = Lottery.objects.filter(time=date_object).first()
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
            date_object = datetime.fromtimestamp(int(lottery_time)/1000)
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
