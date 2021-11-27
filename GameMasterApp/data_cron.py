from GameMasterApp.models import *
from datetime import timedelta, datetime
import csv
import os


user_obj = RegionalManager.objects.all()
#print(user_obj)
start_date = datetime.today() - timedelta(7)
#print(start_date)
end_date = datetime.today()
#print(end_date)

for user in user_obj:
    for agents in user.agents.all():
        #print(agents)
        tickets = TicketID.objects.filter(user = agents.user, lottery__time__gte = start_date, lottery__time__lte = end_date)
        #print(tickets)
        total_inflow = tickets.aggregate(Sum('inflow'))["inflow__sum"]
        total_outflow = tickets.aggregate(Sum('outflow'))["outflow__sum"]
        print("Agent name="+agents.company_name+"Agents pk= " +str(agents.pk)+"total_inflow= "+str(total_inflow)+"total_outflow= "+str(total_outflow))
        commision = total_outflow * (agents.commission_percent/100)
        print("Agent commision "+str(commision))
        commision_regional_manager = total_outflow * (user.commission/100)
        print("Regional managers "+str(commision_regional_manager))
        #print(total_outflow)

