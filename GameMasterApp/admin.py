import datetime
from datetime import timedelta

from django.contrib import admin
from django.contrib.admin import DateFieldListFilter
from rangefilter.filters import DateRangeFilter

from GameMasterApp.models import *


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    search_fields = ('first_name',)

@admin.register(TicketID)
class TicketIDAdmin(admin.ModelAdmin):
    list_display = ('lottery','ticket_id','outflow','inflow','get_ist','user')

    search_fields = ('ticket_id','user__username')
    list_filter = ('lottery',)
    ordering = ['-lottery__time']

    def get_ist(self, obj):
        return obj.lottery.time


@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    list_display = ('user', 'commission_percent')
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
    list_display = ('time', 'winners', 'active')
    list_filter = ('time',)

    # def get_rangefilter_time_default(self, request):
    #     return (datetime.date.today, datetime.date.today)

admin.site.register(Lottery, LotteryAdmin)

@admin.register(Announcement)
class Announcements(admin.ModelAdmin):
    list_display = ('message',)
    pass

# @admin.register(UserLedgerHistory)
# class UserLedgerHistoryAdmin(admin.ModelAdmin):
#     list_display = ('user','outflow','inflow','ticket_individual')

# @admin.register(TotalDebitCredit)
# class TotalDebitCreditAdmin(admin.ModelAdmin):
#     pass


@admin.register(Strategy)
class StrategyAdmin(admin.ModelAdmin):
    pass

@admin.register(SuperVisorAgent)
class SuperVisorAgent(admin.ModelAdmin):
    readonly_fields=('supervisor_agent','total_inflow','total_outflow',)
    list_display = ('agent_name','balance_points','supervisor_agent','total_inflow','total_outflow',)
