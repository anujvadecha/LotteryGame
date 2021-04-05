from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from base.models import *

class User(AbstractUser):
	def name(self):
		return self.first_name + ' ' + self.last_name

class Ticket(BaseModel):
	user = models.ForeignKey(User, null=False, blank=False,on_delete=models.CASCADE)
	set_ticket = models.CharField(default="",blank=False,null=False,max_length=256)
	quantity = models.IntegerField(default=0,blank=False,null=False)
	price = models.IntegerField(default=0,blank=False,null=False)


	def total_price(self):
		try:
			return self.price*self.quantity
		except Exception as e:
			print(e)
			return 0

class TicketID(BaseModel):
	user = models.ForeignKey(User, null=False, blank=False,on_delete=models.CASCADE)
	ticket_set = models.ManyToManyField(Ticket,blank=True)
	total_price = models.IntegerField(default=0,blank=False,null=False)
	total_quantity = models.IntegerField(default=0,blank=False,null=False)
	is_completed = models.BooleanField(default=False)

	def save(self, *args, **kwargs):
		try:
			all_tickets = self.ticket_set.all()
			print(all_tickets)
			price = 0
			quantity = 0 
			for items in all_tickets:
				price  += items.total_price()
				quantity += items.quantity
				self.total_price = price
				self.total_quantity = quantity
			super(TicketID, self).save(*args, **kwargs)
		except Exception as e:
			print(e)
			self.total_price = 0
			self.total_quantity = 0
			super(TicketID, self).save(*args, **kwargs)

class Lottery(BaseModel):
	time =  models.DateTimeField(null=True, blank=True)
	winners = models.CharField(default="[]",blank=True,max_length=5000)
