from django.core.management import BaseCommand
from datetime import datetime, timedelta
import time
from GameMasterApp.assign_task import assign_lottery_timings
from GameMasterApp.models import *
class Command(BaseCommand):
    help = 'Process to help lotteries'

    def create_winners(self):
        while True:
            assign_lottery_timings()
            time.sleep(10)

    def handle(self, *args, **options):
        self.create_winners()
