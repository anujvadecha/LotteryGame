from GameMasterApp.models import *
from datetime import timedelta, datetime
import csv
import os

user_obj = User.objects.filter(user_type="AGENT")
print(user_obj)
start_date = datetime.today() - timedelta(7)
print(start_date)
end_date = datetime.today()
print(end_date)

for user in user_obj:
    tickets = TicketID.objects.filter(user = user, lottery__time__gte = start_date, lottery__time__lte = end_date )
    print(tickets)
