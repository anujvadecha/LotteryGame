import json
from datetime import timedelta

from rest_framework import serializers

from GameMasterApp.models import Lottery, TicketID, User


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

class TicketIDSerializer(serializers.ModelSerializer):
    class Meta:
        model=TicketID
        fields="__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        exclude=['password']
