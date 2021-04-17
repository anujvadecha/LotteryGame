from django.core.management import BaseCommand
from datetime import datetime,timedelta
from GameMasterApp.models import *
class Command(BaseCommand):
    help = 'Process to help lotteries'

    def add_arguments(self, parser):
        parser.add_argument('days', nargs='+', type=int)

    def create_lotteries(self, count):
        Lottery.objects.all().delete()
        for iterator in range(1, count):
            start_date = datetime(2021, 4, iterator,8,30,00)
            end_date = datetime(2021, 4, iterator,8,30,00)
            while end_date != datetime(2021, 4, iterator,23,00,00):
              Lottery.objects.create(time=end_date)
              end_date = end_date + timedelta(minutes=15)

    def handle(self, *args, **options):
        self.create_lotteries(options['days'][0])
