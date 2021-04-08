from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication   # noqa F401
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, HttpResponse,HttpResponseRedirect
from rest_framework.response import Response
from GameMasterApp.models import *
from datetime import datetime,date,time
from pytz import timezone


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return


class BuyTicketsAPI(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = {}
        response['status_code'] = 500
        try:
            data = request.data
            ticket_id = TicketID.objects.create(user=request.user)
            for key,value in data.items():
                ticket = Ticket.objects.create(user=request.user,set_ticket=key,quantity=value["quantity"],price=value["price"])
                ticket_id.ticket_set.add(ticket)
            ticket_id.save()
            response['status_code'] = 200
            response['total_price'] =  ticket_id.total_price
            response['total_quantity'] =  ticket_id.total_quantity
        except Exception as e:
            print(e)
            response = json.dumps(response)
        return Response(data=response)

BuyTickets = BuyTicketsAPI.as_view()


class LotteryTimingsAPI(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        response = {}
        response['status_code'] = 500
        try:
            IST = timezone('Asia/Kolkata')
            print("Lottery timings")
            current_time = datetime.now()
            closest_time = Lottery.objects.filter(time__gte=current_time)
            if closest_time:
                closest_time=closest_time[0].time
                response['closest_time'] = closest_time
            else:
                response['closest_time'] = None
            print(datetime.today())
            today_min = datetime.combine(date.today(), time.min)
            today_max = datetime.combine(date.today(), time.max)
            timings_of_lottery = Lottery.objects.filter(time__range=(today_min, today_max)).values_list('time',flat=True)
            response['timings_of_lottery'] = timings_of_lottery
            response['status_code'] = 200
        except Exception as e:
            print(e)
            response = json.dumps(response)
        return Response(data=response)

LotteryTimings = LotteryTimingsAPI.as_view()

