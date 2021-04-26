from django.core.management import BaseCommand
from datetime import datetime,timedelta
from GameMasterApp.models import *
class Command(BaseCommand):
    help = 'Process to help lotteries'

    def create_winners(self):
        from pytz import timezone
        from datetime import datetime, timedelta
        from GameMasterApp.models import Lottery
        import random
        import json
        IST = timezone('Asia/Kolkata')
        current_time = datetime.now()
        lottery_obj = Lottery.objects.filter(time__gte=current_time)
        if lottery_obj:
            lottery_obj = lottery_obj[0]
            closest_time = lottery_obj.time + timedelta(hours=5, minutes=30)
            difference_for_next_lottery = (closest_time.replace(tzinfo=None) - current_time).total_seconds()
            winner_dict = {"A": "", "B": "", "C": "", "D": "", "E": "", "F": "", "G": "", "H": "", "I": "", "J": ""}
            if difference_for_next_lottery <= 10000 and lottery_obj.winners == "{}":
                for iterator in range(0, 10):
                    winner_dict[list(winner_dict.keys())[iterator]] = random.randint(0, 99)
            lottery_obj.winners = json.dumps(winner_dict)
            lottery_obj.save()

    def handle(self, *args, **options):
        self.create_winners()
