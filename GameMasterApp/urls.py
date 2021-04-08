from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('buy_ticket/', views.BuyTickets, name="BuyTickets"),
    path('lottery_timings/',views.LotteryTimings,name="LotteryTimings")
    path('lottery_winners/',views.LotteryWinners,name="LotteryWinners")
]
