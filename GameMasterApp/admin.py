from django.contrib import admin

# Register your models here.
from GameMasterApp.models import *

admin.site.register(User)
admin.site.register(Ticket)
admin.site.register(TicketID)
