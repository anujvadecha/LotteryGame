from GameMasterApp.models import  TicketID
from pytz import timezone
from datetime import datetime, timedelta
from GameMasterApp.models import Lottery, Ticket
import random
import json
import sys

def assign_lottery_timings():
    time_difference = 30
    try:
        IST = timezone('Asia/Kolkata')
        current_time = IST.localize(datetime.now())
        lottery_obj = Lottery.objects.filter(pk=7530)[0]
        winner_dict = {"A": "2", "B": "65", "C": "71", "D": "53", "E": "42", "F": "69", "G": "89", "H": "12", "I": "8", "J": "49"}
        lottery_obj.winners = json.dumps(winner_dict)
        lottery_obj.completed = True
        lottery_obj.save()
        for key, value in winner_dict.items():
            for items in Ticket.objects.filter(lottery=lottery_obj, set_ticket=str(key) + str(value)):
                total_winning = items.total_price() * 90
                ticket_id = TicketID.objects.filter(ticket_set__in=[items], cancelled=False)
                if ticket_id:
                   ticket_id = ticket_id.first()
                   ticket_id.increase_inflow(total_winning)
                   ticket_id.save()
        lottery_obj.save()

    except Exception as e:
        print(str(e))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line %s", str(exc_tb.tb_lineno))
