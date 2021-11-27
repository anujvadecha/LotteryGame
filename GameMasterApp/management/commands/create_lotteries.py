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
        # Lottery.objects.all().delete()

        IST=get_current_timezone()
        days_to_add = 0
        for i in range(0,12):
            for iterator in range(1, count):
                print(iterator)
                try:
                    start_date = IST.localize(datetime(datetime.now().year+3, int((datetime.now()+timedelta(days=days_to_add)).strftime("%m")), iterator,00,00,00 ))
                    end_date = IST.localize(datetime(datetime.now().year+3, int((datetime.now()+timedelta(days=days_to_add)).strftime("%m")), iterator,23,59,00 ))
                    print(start_date)
                    while start_date <= end_date:
                        if not Lottery.objects.filter(time=start_date).exists():
                                print(f"Creating lottery {start_date}")
                                Lottery.objects.create(time=start_date)
                                start_date = start_date + timedelta(minutes=15)
                except Exception as e:
                    print(e)
            days_to_add =days_to_add+31
    def handle(self, *args, **options):
        self.create_lotteries(options['days'][0])
