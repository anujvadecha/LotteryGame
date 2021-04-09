import json

from rest_framework.response import Response
from rest_framework.views import APIView

def status_api(function):
  def new_function(*args, **kwargs):
    print("started processing function")
    response={}
    try:
        response = function(*args, **kwargs)
        print(f"response from function is {response}")
        response["status_code"] = 200
        return Response(data=json.dumps(response))
    except:
        response["status_code"] = 500
        return Response(data=json.dumps(response))
  return new_function

