import json
from datetime import timedelta

from rest_framework import serializers

from GameMasterApp.models import Lottery


class LotterySerializer(serializers.ModelSerializer):
    time_ist = serializers.SerializerMethodField()
    winners = serializers.SerializerMethodField()

    def get_time_ist(self,obj):
        return obj.time+timedelta(hours=5,minutes=30)
    def get_winners(self,obj):
        return json.loads(obj.winners)
    class Meta:
        model=Lottery
        fields=["id","winners","active","completed","time_ist"]
