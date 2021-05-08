from django.core.management import BaseCommand
from datetime import datetime, timedelta
import time
from GameMasterApp.assign_task import assign_lottery_timings
from GameMasterApp.models import *

class Command(BaseCommand):
    help = 'Proce'

    def winner_tester(self):
        TicketID.objects.all().delete()
        Ticket.objects.all().delete()
        # TotalDebitCredit.objects.all().delete()

    def handle(self, *args, **options):
        self.winner_tester()
