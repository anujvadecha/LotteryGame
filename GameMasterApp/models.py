from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db.models import Sum

from base.constants import USER_TYPE_CHOICES
from base.models import *
from base.utils import random_string_generator, unique_transaction_id_generator
import logging
from django_currentuser.middleware import (get_current_user, get_current_authenticated_user)
from django_currentuser.db.models import CurrentUserField
from django.http import HttpResponse
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

logger = logging.getLogger(__name__)


class User(AbstractUser):
    phone_number = models.CharField(default="", max_length=256, blank=True, null=True)
    address = models.TextField(default="", blank=True, null=True)
    balance_points = models.IntegerField(default=0, null=True,blank=True)
    total_inflow = models.IntegerField(default=0)
    total_outflow = models.IntegerField(default=0)
    user_type = models.CharField(choices=USER_TYPE_CHOICES,default = "PLAYER",max_length=255)
    supervisor = models.BooleanField(default=False)

    def name(self):
        return self.first_name + ' ' + self.last_name

    def save(self, *args, **kwargs):
        try:
            if(self.user_type == "AGENT" and Agent.objects.filter(user=self).count()==0):
                Agent(user=self, commission_percent=6, company_name=self.first_name,
                      agent_created_by=self).save()


        except Exception as e:
            logger.error(e)
            raise e
        super(User, self).save(*args, **kwargs)



class Players(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Region(BaseModel):
    name = models.CharField(unique=True, default="", max_length=256, null=False, blank=False)


class Agent(BaseModel):
    user = models.ForeignKey(User, blank=False, null=False, on_delete=models.CASCADE, related_name="agent_user")
    company_name = models.CharField(max_length=255, default="", blank=True, null=True)
    # Enabled flag no need since this will be controled by
    commission_percent = models.FloatField(default=0)
    agent_created_by = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True,
                                         related_name="agent_created_by")
    region = models.ForeignKey(Region, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.company_name

class RegionalManager(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    agents = models.ManyToManyField(Agent, blank=True)
    commission = models.FloatField(default=2.0)
    def __str__(self):
        return self.user.first_name

class Lottery(BaseModel):
    time = models.DateTimeField(null=True, blank=True)
    winners = models.CharField(default="{}", blank=True, max_length=5000)
    active = models.BooleanField(default=True)
    completed = models.BooleanField(default=False)
    a_set_winning = ArrayField(models.IntegerField(blank=True,default=0),size=100,null=True,blank=True)
    b_set_winning = ArrayField(models.IntegerField(blank=True,default=0),size=100,null=True,blank=True)
    c_set_winning = ArrayField(models.IntegerField(blank=True,default=0),size=100,null=True,blank=True)
    d_set_winning = ArrayField(models.IntegerField(blank=True,default=0),size=100,null=True,blank=True)
    e_set_winning = ArrayField(models.IntegerField(blank=True,default=0),size=100,null=True,blank=True)
    f_set_winning = ArrayField(models.IntegerField(blank=True,default=0),size=100,null=True,blank=True)
    g_set_winning = ArrayField(models.IntegerField(blank=True,default=0),size=100,null=True,blank=True)
    h_set_winning = ArrayField(models.IntegerField(blank=True,default=0),size=100,null=True,blank=True)
    i_set_winning = ArrayField(models.IntegerField(blank=True,default=0),size=100,null=True,blank=True)
    j_set_winning = ArrayField(models.IntegerField(blank=True,default=0),size=100,null=True,blank=True)

    def initiate_winning_sets(self):
        if self.a_set_winning==None:
            self.a_set_winning=100*[0]
        if self.b_set_winning==None:
            self.b_set_winning=100*[0]
        if self.c_set_winning==None:
            self.c_set_winning=100*[0]
        if self.d_set_winning==None:
            self.d_set_winning=100*[0]
        if self.e_set_winning==None:
            self.e_set_winning=100*[0]
        if self.f_set_winning==None:
            self.f_set_winning=100*[0]
        if self.g_set_winning==None:
            self.g_set_winning=100*[0]
        if self.h_set_winning==None:
            self.h_set_winning=100*[0]
        if self.i_set_winning==None:
            self.i_set_winning=100*[0]
        if self.j_set_winning==None:
            self.j_set_winning=100*[0]

    def add_to_winning_set(self,set,number,winning):
        number=int(number)
        if set == 'A' :
            if self.a_set_winning != None :
                self.a_set_winning[number] += winning
            else:
                self.a_set_winning = 100*[0]
                self.a_set_winning[number] += winning
        elif set == 'B' :
            if self.b_set_winning != None :
                self.b_set_winning[number] += winning
            else:
                self.b_set_winning = 100*[0]
                self.b_set_winning[number] += winning
        elif set == 'C' :
            if self.c_set_winning != None :
                self.c_set_winning[number] += winning
            else:
                self.c_set_winning = 100*[0]
                self.c_set_winning[number] += winning
        elif set == 'D' :
            if self.d_set_winning != None :
                self.d_set_winning[number] += winning
            else:
                self.d_set_winning = 100*[0]
                self.d_set_winning[number] += winning
        elif set == 'E' :
            if self.e_set_winning != None :
                self.e_set_winning[number] += winning
            else:
                self.e_set_winning = 100*[0]
                self.e_set_winning[number] += winning
        elif set == 'F':
            if self.f_set_winning != None:
                self.f_set_winning[number] += winning
            else:
                self.f_set_winning = 100 * [0]
                self.f_set_winning[number] += winning
        elif set == 'G' :
            if self.g_set_winning != None :
                self.g_set_winning[number] += winning
            else:
                self.g_set_winning = 100*[0]
                self.g_set_winning[number] += winning
        elif set == 'H' :
            if self.h_set_winning != None :
                self.h_set_winning[number] += winning
            else:
                self.h_set_winning = 100*[0]
                self.h_set_winning[number] += winning
        elif set == 'I' :
            if self.i_set_winning != None :
                self.i_set_winning[number] += winning
            else:
                self.i_set_winning = 100*[0]
                self.i_set_winning[number] += winning
        elif set == 'J' :
            if self.j_set_winning != None :
                self.j_set_winning[number] += winning
            else:
                self.j_set_winning = 100*[0]
                self.j_set_winning[number] += winning
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
        if user_obj.user_type == "PLAYER":
            user_obj.balance_points += amount
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


class Strategy(BaseModel):
   strategy = models.BooleanField(default=True)

   def __str__(self):
       return "Strategy"


class SuperVisorAgent(BaseModel):
   agent_name = models.TextField(default="",blank=True,null=True,unique=True)
   balance_points = models.IntegerField(default=0,blank=True,null=True)
   supervisor_agent = models.ForeignKey(User,null=True,blank=True,on_delete=models.SET_NULL,editable=False)
   total_inflow = models.IntegerField(default=0,blank=True,null=True,editable=False)
   total_outflow = models.IntegerField(default=0,blank=True,null=True,editable=False)
   def __str__(self):
       return self.agent_name

   def __init__(self, *args, **kwargs):
        try:
           super(SuperVisorAgent, self).__init__(*args, **kwargs)
           self.balance_points = User.objects.get(username = self.agent_name.strip()).balance_points
           self.total_inflow = User.objects.get(username = self.agent_name.strip()).total_inflow
           self.total_outflow = User.objects.get(username = self.agent_name.strip()).total_outflow
        except Exception as e:
           self.balance_points = 0
           self.total_inflow = 0
           self.total_outflow = 0

   def clean(self):
       current_user = get_current_user()
       if current_user.balance_points <= self.balance_points:
          raise ValidationError(_('You do not have sufficient funds'))
   

   def save(self, *args, **kwargs):
       try:
           current_user = get_current_user()
           agent_name = self.agent_name.strip()

           if current_user.balance_points >= self.balance_points:
              try:
                 user_agent = User.objects.get(username = self.agent_name.strip())
                 user_agent.balance_points = self.balance_points
                 user_agent.save()
                 current_user.balance_points = current_user.balance_points - self.balance_points
                 current_user.save()
              except Exception as e:
                 logger.error(e)
                 pass
           else:
              logger.error("Insufficient funds")

           self.supervisor_agent=current_user
       except Exception as e:
           raise e
       super(SuperVisorAgent, self).save(*args, **kwargs)
