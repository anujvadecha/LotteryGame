from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication   # noqa F401
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, HttpResponse,HttpResponseRedirect
from rest_framework.response import Response
from GameMasterApp.models import *


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
            print(data)
            ticket_id = TicketID.objects.create(user=request.user)
            for key,value in data.items():
                print(key)
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
