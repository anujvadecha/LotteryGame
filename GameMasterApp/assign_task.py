from GameMasterApp.models import  TicketID
from pytz import timezone
from datetime import datetime, timedelta
from GameMasterApp.models import Lottery, Ticket
import random
import json
import sys

def assign_lottery_timings():
    time_difference = 100
    try:
        IST = timezone('Asia/Kolkata')
        current_time = IST.localize(datetime.now())
        print(f"current time {current_time}")
        print(current_time)
        lottery_obj = Lottery.objects.filter(time__gte=current_time, completed=False).order_by('time').first()
        print(lottery_obj)
        print(f" Lottery time {lottery_obj.time}")
        if lottery_obj:
            # validate_lottery_conditions(lottery=lottery_obj)
            closest_time = lottery_obj.time
            print(f"closest_time {closest_time} ")
            difference_for_next_lottery = (closest_time - current_time).total_seconds()
            winner_dict = {"A": "", "B": "", "C": "", "D": "", "E": "", "F": "", "G": "", "H": "", "I": "", "J": ""}
            print(difference_for_next_lottery)
            if difference_for_next_lottery <= time_difference and difference_for_next_lottery > 0:
                # and lottery_obj.winners == "{}":
                print(" running lottery ")
                for key, value in winner_dict.items():
                    print("assigning winner")
                    winner_dict[key] = random.randint(0, 99)
                lottery_obj.winners = json.dumps(winner_dict)
                lottery_obj.completed = True
                lottery_obj.save()
                for key, value in winner_dict.items():
                    for items in Ticket.objects.filter(lottery = lottery_obj, set_ticket=str(key) + str(value)):
                        total_winning = items.total_price() * 9
                        ticket_id = TicketID.objects.filter(ticket_set__in = [items],cancelled=False)
                        if ticket_id:
                            ticket_id = ticket_id.first()
                            ticket_id.increase_inflow(total_winning)
                            ticket_id.save()
                lottery_obj.save()
    except Exception as e:
        print(str(e))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line %s", str(exc_tb.tb_lineno))
