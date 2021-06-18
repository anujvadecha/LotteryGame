from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db.models import Sum

from base.constants import USER_TYPE_CHOICES
from base.models import *
from base.utils import random_string_generator, unique_transaction_id_generator



class User(AbstractUser):
    phone_number = models.CharField(default="", max_length=256, blank=True, null=True)
    address = models.TextField(default="", blank=True, null=True)
    balance_points = models.IntegerField(default=1000, null=True,blank=True)
    total_inflow = models.IntegerField(default=0)
    total_outflow = models.IntegerField(default=0)
    user_type = models.CharField(choices=USER_TYPE_CHOICES,default = "PLAYER",max_length=255)

    def name(self):
        return self.first_name + ' ' + self.last_name

    def save(self, *args, **kwargs):
        try:
            if(self.user_type == "AGENT" and Agent.objects.filter(user=self).count()==0):
                Agent(user=self, commission_percent=6, company_name=self.first_name,
                      agent_created_by=self).save()
        except Exception as e:
            print(e)
        super(User, self).save(*args, **kwargs)



class Players(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Region(BaseModel):
    name = models.CharField(unique=True, default="", max_length=256, null=False, blank=False)


class Agent(BaseModel):
    user = models.ForeignKey(User, blank=False, null=False, on_delete=models.CASCADE, related_name="agent_user")
    company_name = models.CharField(max_length=255, default="")
    # Enabled flag no need since this will be controled by
    commission_percent = models.FloatField(default=0)
    agent_created_by = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True,
                                         related_name="agent_created_by")
    region = models.ForeignKey(Region, null=True, blank=True, on_delete=models.SET_NULL)


class RegionalManager(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    agents = models.ManyToManyField(Agent, blank=True)


class Lottery(BaseModel):
    time = models.DateTimeField(null=True, blank=True)
    winners = models.CharField(default="{}", blank=True, max_length=5000)
    active = models.BooleanField(default=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return str(self.time)

class Ticket(BaseModel):
    user = models.ForeignKey(User, null = False, blank = False, on_delete = models.CASCADE)
    set_ticket = models.CharField(default="", blank=False, null=False, max_length=256)
    quantity = models.IntegerField(default=0, blank=False, null=False)
    price = models.IntegerField(default=0, blank=False, null=False)
    lottery = models.ForeignKey(Lottery, on_delete=models.SET_NULL, null=True, blank=True)
    number = models.CharField(default="", blank=False, null=False, max_length=256)
    total = models.IntegerField(default=0)

    def total_price(self):
        try:
            return self.price * self.quantity
        except Exception as e:
            return 0

    def save(self, *args, **kwargs):
        try:
            self.number = self.set_ticket[1:]
            self.total= self.total_price()
        except Exception as e:
            pass
        super(Ticket, self).save(*args, **kwargs)

    def __str__(self):
        return self.set_ticket


class TicketID(BaseModel):

    ticket_id = models.CharField(primary_key=True, default=unique_transaction_id_generator, max_length=50)
    user = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE,db_index=True)
    ticket_set = models.ManyToManyField(Ticket, blank=True)
    total_price = models.IntegerField(default=0, blank=False, null=False)
    total_quantity = models.IntegerField(default=0, blank=False, null=False)
    is_completed = models.BooleanField(default=False)
    lottery = models.ForeignKey(Lottery, on_delete=models.SET_NULL, null=True, blank=True)
    cancelled = models.BooleanField(default=False)
    outflow = models.IntegerField(default=0)
    inflow = models.IntegerField(default=0, null=True, blank=True)
    is_vendor_transaction = models.BooleanField(default=False)

    def increase_inflow(self,amount):
        self.inflow += amount
        user_obj=self.user
        user_obj.total_inflow += self.inflow
        user_obj.save()

    def increase_outflow(self,amount):
        self.outflow += amount
        user_obj = self.user
        user_obj.total_outflow += self.outflow
        user_obj.save()

    def increase_on_win(self,value):
        tickets_won = self.ticket_set.filter(number=value)
        total_inflow_quantity = tickets_won.aggregate(Sum('total'))["total__sum"]
        self.inflow += total_inflow_quantity * 9

    def save(self, *args, **kwargs):
        try:
            all_tickets = self.ticket_set.all()
            price = 0
            quantity = 0
            for items in all_tickets:
                price += items.total_price()
                quantity += items.quantity
                self.total_price = price
                self.total_quantity = quantity
            super(TicketID, self).save(*args, **kwargs)
        except Exception as e:
            print(e)
            self.total_price = 0
            self.total_creditquantity = 0
            super(TicketID, self).save(*args, **kwargs)

    class Meta:
        indexes = [
            models.Index(fields=['created_at','user'])
        ]

class Announcement(BaseModel):
    message=models.CharField(max_length=1000,blank=False,null=False)
    def __str__(self):
        return self.message

class Admin(BaseModel):
    user = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    regional_managers = models.ManyToManyField(RegionalManager, blank=True)
    agents = models.ManyToManyField(Agent, blank=True)
    players = models.ManyToManyField(Players, blank=True)


