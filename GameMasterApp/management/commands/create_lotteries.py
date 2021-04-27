from django.core.management import BaseCommand
from datetime import datetime, timedelta

from django.utils.timezone import get_current_timezone

from GameMasterApp.models import *
from pytz import timezone
class Command(BaseCommand):
    help = 'Process to help lotteries'

    def add_arguments(self, parser):
        parser.add_argument('days', nargs='+', type=int)

    def create_lotteries(self, count):
        Lottery.objects.all().delete()
        IST=get_current_timezone()
        for iterator in range(1, count):
            print(iterator)
            start_date = IST.localize(datetime(2021, 4, iterator,8,30,00 ))
            end_date = IST.localize(datetime(2021, 4, iterator,23,59,00 ))
            while start_date <= end_date:
              print(start_date)
              Lottery.objects.create(time=start_date)
              start_date = start_date + timedelta(minutes=15)

    def handle(self, *args, **options):
        self.create_lotteries(options['days'][0])
