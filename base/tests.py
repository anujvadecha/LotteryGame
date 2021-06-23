# from django.test import TestCase
# Create your tests here.

    # and lottery_obj.winners == "{}":
import random

winner_dict = {"A": "", "B": "", "C": "", "D": "", "E": "", "F": "", "G": "", "H": "", "I": "", "J": ""}
for key, value in winner_dict.items():
    winner_dict[key] = random.randint(0, 99)
print(winner_dict)
