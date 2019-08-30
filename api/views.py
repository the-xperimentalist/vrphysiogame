from rest_framework.views import APIView
from django.contrib.auth.models import User
from camdetection.models import UserDatabase
from django.contrib.auth import authenticate
from rest_framework.response import Response

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
