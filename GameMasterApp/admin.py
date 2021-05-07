from django.contrib import admin
from GameMasterApp.models import *

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    pass

@admin.register(TicketID)
class TicketIDAdmin(admin.ModelAdmin):
    pass

@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    pass

@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    pass

@admin.register(RegionalManager)
class RegionalManagerAdmin(admin.ModelAdmin):
    pass

@admin.register(Admin)
class AdminAdmin(admin.ModelAdmin):
    pass

class LotteryAdmin(admin.ModelAdmin):
	list_display = ('time', 'winners','active')

admin.site.register(Lottery,LotteryAdmin)

# @admin.register(UserLedgerHistory)
# class UserLedgerHistoryAdmin(admin.ModelAdmin):
#     list_display = ('user','outflow','inflow','ticket_individual')

@admin.register(TotalDebitCredit)
class TotalDebitCreditAdmin(admin.ModelAdmin):
	pass


