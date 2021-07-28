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
        winner_dict = {"A": 39, "B": 11, "C": 37, "D": 33, "E": 38, "F": 76, "G": 2, "H": 74, "I": 21, "J": 8}
        lottery_obj=Lottery.objects.filter(id='11485')
        for key, value in winner_dict.items():
            for items in Ticket.objects.filter(lottery=lottery_obj, set_ticket=str(key) + str(value)):
                total_winning = items.total_price() * WINNING
                ticket_id = TicketID.objects.filter(ticket_set__in=[items], cancelled=False)
                if ticket_id:
                    print(ticket_id)
                    ticket_id = ticket_id.first()
                    ticket_id.increase_inflow(total_winning)
                    ticket_id.save()
        lottery_obj.save()
    except Exception as e:
        print(str(e))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line %s", str(exc_tb.tb_lineno))

