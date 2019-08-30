from rest_framework.views import APIView
from django.contrib.auth.models import User
from camdetection.models import UserDatabase
from django.contrib.auth import authenticate
from rest_framework.response import Response
import json
import math

class LoginView(APIView):

    def post(self, request, *args, **kwargs):
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        return Response({'id':user.id, 'username': username})

class UserDetail(APIView):

    def get(self, request, *args, **kwargs):
        _id = kwargs['id']
        u = User.objects.get(id=_id)
        return Response({'username': u.username})

class UserDBCreate(APIView):

    def post(self, request, *args, **kwargs):
        u = User.objects.get(id=request.data['user_id'])
        ud = UserDatabase(user=u, phone_reg_name=request.data['phone_reg_name'])
        ud.save()
        return Response({'id':ud.id})

class UserDBBodyMovement(APIView):

    def get(self, request, *args, **kwargs):
        user_db = UserDatabase.objects.get(id=kwargs['id'])
        return_json_data = json.loads(user_db.json_data)
        x1 = return_json_data['leftEye']['x']
        x2 = return_json_data['rightEye']['x']
        y1 = return_json_data['leftEye']['y']
        y2 = return_json_data['rightEye']['y']
        den = math.sqrt(math.pow(y1 - y2, 2), math.pow(x2 - x1, 2))
        num = y2 - y1
        slope = num / den
        return_json = {'slope': slope}
        return Response(return_json)
