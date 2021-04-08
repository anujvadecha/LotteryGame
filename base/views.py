from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView


class BaseApiView(APIView):




    class Meta:
        abstract = True
