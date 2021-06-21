# from django.test import TestCase
# Create your tests here.
from GameMasterApp.models import Lottery
from base.constants import PEOPLES_WINNING_PERCENT


def calculate_for_set(lottery_winning_set):
    sum = 0
    for i in lottery_winning_set:
        sum += i
    print(sum)
    amount_to_win = sum * (PEOPLES_WINNING_PERCENT / 100)
    max = 0
    max_index = 0
    for index in range(0, len(lottery_winning_set)):
        if lottery_winning_set[index] < amount_to_win and lottery_winning_set[index] >= max:
            max = lottery_winning_set[index]
            max_index = index
    return max_index


def get_winners_for_lottery(lottery):
    A = calculate_for_set(lottery.a_set_winning)
    B = calculate_for_set(lottery.b_set_winning)
    C = calculate_for_set(lottery.c_set_winning)
    D = calculate_for_set(lottery.d_set_winning)
    E = calculate_for_set(lottery.e_set_winning)
    F = calculate_for_set(lottery.f_set_winning)
    G = calculate_for_set(lottery.g_set_winning)
    H = calculate_for_set(lottery.h_set_winning)
    I = calculate_for_set(lottery.i_set_winning)
    J = calculate_for_set(lottery.j_set_winning)
    return {'A':A,'B':B,'C':C,'D':D,'E':E,'F':F,'G':G,'H':H,'I':I,'J':J}


# set = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,90,0,0,0,0,0,0,0,2
#     ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
#     ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
#        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
max_index = get_winners_for_lottery(Lottery.objects.all().first())
print(max_index)
print(set[max_index])
