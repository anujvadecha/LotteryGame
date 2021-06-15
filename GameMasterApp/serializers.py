import json
from datetime import timedelta

from allauth import exceptions
from django.contrib.auth import authenticate
from rest_framework import serializers

from GameMaster import settings
from GameMasterApp.models import Lottery, TicketID, User, Ticket


class LotterySerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()
    winners = serializers.SerializerMethodField()

    def get_time(self,obj):
        return obj.time

    def get_winners(self,obj):
        return json.loads(obj.winners)

    class Meta:
        model=Lottery
        fields = ["id","winners","active","completed","time"]

class TicketSerializer(serializers.ModelSerializer):
    set_ticket=serializers.SerializerMethodField()

    def get_set_ticket(self,obj):
        return obj.set_ticket[:1] +"-"+ "{0:0=2d}".format(int(obj.number))

    class Meta:
        model=Ticket
        fields=["price","quantity","set_ticket"]

class TicketIDSerializer(serializers.ModelSerializer):
    ticket_set = TicketSerializer(many=True,read_only=True)
    lottery = serializers.SerializerMethodField()

    def get_lottery(self,obj):
        return LotterySerializer(obj.lottery).data

    class Meta:
        model=TicketID
        fields= ["ticket_set","ticket_id","total_price","total_quantity","created_at","lottery","inflow","outflow","cancelled"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude=['password']

