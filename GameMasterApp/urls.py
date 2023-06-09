from django.contrib import admin
from django.urls import path, include
from . import views
from .views import UserAuthentication

urlpatterns = [
    path('buy_ticket/', views.BuyTickets, name="BuyTickets"),
    path('lottery_timings/', views.LotteryTimings, name="LotteryTimings"),
    path('lottery_winners/', views.LotteryWinners, name="LotteryWinners"),
    path('total_points/', views.TotalPointsView, name="TotalPoints"),
    path('ticket_id/', views.TicketIDAsView, name="TicketId"),
    path('cancel_ticket/', views.CancelTicketView, name="CancelTicket"),
    path('claim_ticket/', views.ClaimTicketView, name="ClaimTicket"),
    path('authenticate/', UserAuthentication.as_view(), name="UserAuthenticator"),
]
