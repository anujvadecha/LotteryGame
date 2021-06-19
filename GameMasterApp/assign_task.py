from GameMasterApp.models import TicketID
from pytz import timezone
from datetime import datetime, timedelta
from GameMasterApp.models import Lottery, Ticket
import random
import json
import sys

from GameMasterApp.views import raise_info, raise_exception
from base.constants import WINNING, PEOPLES_WINNING_PERCENT

"""
def calculate_for_set(lottery_winning_set,winners):
    sum = 0
    for i in lottery_winning_set:
        sum += i
    amount_to_win = sum * (PEOPLES_WINNING_PERCENT / 100)
    amount_to_win = amount_to_win/90
    max = -1
    max_index = 0
    # Available randoms is just to normalize the system when nobody wins instead of returning 0 it will return a random value
    available_randoms = []
    for index in range(0, len(lottery_winning_set)):
        if lottery_winning_set[index] < amount_to_win and lottery_winning_set[index] >= max and (index not in winners):
            max = lottery_winning_set[index]
            max_index = index
            available_randoms.append(index)
    if max_index == 0 and lottery_winning_set[max_index] != max:
        return available_randoms[random.randint(0, len(available_randoms))]
    return max_index
"""



def calculate_for_set(lottery_winning_set, winners):
    sum = 0
    for i in lottery_winning_set:
        sum += i
    amount_to_win = sum * (PEOPLES_WINNING_PERCENT / 100)
    amount_to_win = amount_to_win/90

    # Available randoms is just to normalize the system when nobody wins instead of returning 0 it will return a random value
    available_randoms = []
    for index in range(0, len(lottery_winning_set)):
        if lottery_winning_set[index] < amount_to_win and (index not in winners):
            # max = lottery_winning_set[index]
            # max_index = index
            available_randoms.append(index)
    #if max_index == 0 and lottery_winning_set[max_index] != max:
    #    return available_randoms[random.randint(0, len(available_randoms))]

    if len(available_randoms) == 0:
       return random.randint(0, 100)

    return available_randoms[random.randint(0, len(available_randoms))]


    #return max_index



def get_winners_for_lottery(lottery):
    winners=[]
    A = calculate_for_set(lottery.a_set_winning,winners)
    winners.append(A)
    B = calculate_for_set(lottery.b_set_winning,winners)
    winners.append(B)
    C = calculate_for_set(lottery.c_set_winning,winners)
    winners.append(C)
    D = calculate_for_set(lottery.d_set_winning,winners)
    winners.append(D)
    E = calculate_for_set(lottery.e_set_winning,winners)
    winners.append(E)
    F = calculate_for_set(lottery.f_set_winning,winners)
    winners.append(F)
    G = calculate_for_set(lottery.g_set_winning,winners)
    winners.append(G)
    H = calculate_for_set(lottery.h_set_winning,winners)
    winners.append(H)
    I = calculate_for_set(lottery.i_set_winning,winners)
    winners.append(I)
    J = calculate_for_set(lottery.j_set_winning,winners)
    return {'A': A, 'B': B, 'C': C, 'D': D, 'E': E, 'F': F, 'G': G, 'H': H, 'I': I, 'J': J}


def assign_lottery_timings():
    time_difference = 30
    try:
        IST = timezone('Asia/Kolkata')
        current_time = IST.localize(datetime.now())
        lottery_obj = Lottery.objects.filter(time__gte=current_time, completed=False).order_by('time').first()
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
                lottery_obj.initiate_winning_sets()
                #try:
                winner_dict = get_winners_for_lottery(lottery=lottery_obj)
                #except Exception as e:
                #    raise_exception(str(e))
                #    for key, value in winner_dict.items():
                #        print("assigning winner")
                #        winner_dict[key] = random.randint(0, 99)
                lottery_obj.winners = json.dumps(winner_dict)
                lottery_obj.completed = True
                lottery_obj.save()
                for key, value in winner_dict.items():
                    for items in Ticket.objects.filter(lottery=lottery_obj, set_ticket=str(key) + str(value)):
                        total_winning = items.total_price() * WINNING
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