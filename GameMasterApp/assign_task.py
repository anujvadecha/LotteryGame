from GameMasterApp.models import UserLedgerHistory, TicketID


def assign_lottery_timings():
	from pytz import timezone
	from datetime import datetime,timedelta
	from GameMasterApp.models import Lottery,Ticket
	import random
	import json
	import sys
	try:
		IST = timezone('Asia/Kolkata')
		current_time = IST.localize(datetime.now())
		print(f"current time {current_time}")
		print(current_time)
		lottery_obj = Lottery.objects.filter(time__gte=current_time).order_by('time')
		print(f" Lottery time {lottery_obj[0].time}")
		if lottery_obj:
			lottery_obj = lottery_obj[0]
			closest_time = lottery_obj.time
			print(f"closest_time {closest_time} ")
			difference_for_next_lottery = (closest_time - current_time).total_seconds()
			winner_dict = {"A":"","B":"","C":"","D":"","E":"","F":"","G":"","H":"","I":"","J":""}
			print(difference_for_next_lottery)
			if difference_for_next_lottery <= 90000 and difference_for_next_lottery>0 :
					# and lottery_obj.winners == "{}":
				print("running lottery")
				for key,value in winner_dict.items():
					print("assigning winner")
					winner_dict[key] = random.randint(0,99)
			lottery_obj.winners = json.dumps(winner_dict)
			lottery_obj.save()
			total_debit = 0
			for key,value in winner_dict.items():
					print(lottery_obj.pk)
					print(Ticket.objects.filter(lottery=lottery_obj,set_ticket=str(key)+str(value)))
					for items in Ticket.objects.filter(lottery=lottery_obj,set_ticket=str(key)+str(value)):
						total_winning = items.total_price()*9
						UserLedgerHistory.objects.create(user=items.user,credit=0,debit=total_winning,ticket_individual=items)
						ticket_id = TicketID.objects.filter(ticket_set__in=[items])[0]
						ticket_id.returns = ticket_id.returns+total_winning
						ticket_id.save()
			lottery_obj.save()
	except Exception as e:
		print(str(e))
		exc_type, exc_obj, exc_tb = sys.exc_info()
		print("line %s", str(exc_tb.tb_lineno))


assign_lottery_timings()
