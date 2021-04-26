def assign_lottery_timings():
	from pytz import timezone
	from datetime import datetime,timedelta
	from GameMasterApp.models import Lottery,Ticket
	import random
	import json
	try:
		IST = timezone('Asia/Kolkata')
		current_time = datetime.now()
		print(current_time)
		lottery_obj = Lottery.objects.filter(time__gte=current_time)
		if lottery_obj:
			lottery_obj = lottery_obj[0]
			closest_time = lottery_obj.time + timedelta(hours=5,minutes=30)
			difference_for_next_lottery = (closest_time.replace(tzinfo=None) - current_time).total_seconds()
			winner_dict = {"A":"","B":"","C":"","D":"","E":"","F":"","G":"","H":"","I":"","J":""}
			if difference_for_next_lottery <= 3000 and lottery_obj.winners == "{}":
				for iterator in range(0,10):
					winner_dict[list(winner_dict.keys())[iterator]] = random.randint(0,99)
			lottery_obj.winners = json.dumps(winner_dict)
			total_debit = 0
			for key,value in winner_dict.items():
					for items in Ticket.objects.filter(lottery=lottery_obj,set_ticket=str(key)+str(value)):
						UserLedgerHistory.objects.create(user=items.user,credit=0,debit=items.total_price(),ticket_individual=items)
			lottery_obj.save()
	except Exception as e:
		print(e)


assign_lottery_timings()
