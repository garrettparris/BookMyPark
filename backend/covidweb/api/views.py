from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponseRedirect
import requests
from .serializers import LocationSerializer, BookingSerializer
from .models import Location, Booking
from twilio.rest import Client 
from datetime import datetime
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
import base64
import json
from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework import response, decorators, permissions, status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserCreateSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['username'] = self.user.username
        data['first_name'] = self.user.first_name
        data['last_name'] = self.user.last_name
        data['email'] = self.user.email
        # Add extra responses here
        data['id'] = self.user.id
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
User = get_user_model()

@decorators.api_view(["POST"])
@decorators.permission_classes([permissions.AllowAny])
def registration(request):
    serializer = UserCreateSerializer(data=request.data)
    if not serializer.is_valid():
        return response.Response(serializer.errors, status.HTTP_400_BAD_REQUEST)        
    user = serializer.save()
    refresh = RefreshToken.for_user(user)
    res = {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        'id': user.id,
        "username": user.username,
        "first_name": user.first_name,
        "email": user.email,
    }
    return response.Response(res, status.HTTP_201_CREATED)

def send_message(request):
    name = request.data.get('name')
    location = request.data.get('location')
    start = request.data.get('start')
    end = request.data.get('end')
    date = request.data.get('date')
    phone_number = request.data.get('phone_number')
    attendees = request.data.get('attendees')
    data = requests.get(location)
    jsondata = data.json()
    location_name = jsondata['name']
    location_type = jsondata['type']
    account_sid = 'ACdc82aab8d58ebbe4fdb15e1b84958065' 
    auth_token = '47f948fbd52881a32bf1da463ee04738'
    client = Client(account_sid, auth_token)
    message = client.messages.create( 
                              from_='+18509403611',
                              body=location_name + ' ' + location_type + ' booked from ' + start + ' to ' + end +' on ' + date[:10] + ' by ' + name + ' for ' + attendees + ' people.',
                              to=phone_number 
                          ) 
 
    print(message.sid)
class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all().order_by('name')
    serializer_class = LocationSerializer
    def post(self, request):
        Location.objects.create(
            name = request.POST.get('name'),
            type = request.POST.get('type'),
            area = request.POST.get('area'),
            longitude = request.POST.get('longitude'),
            latitude = request.POST.get('latitude')

        )
        return HttpResponseRedirect('/success/')
class BookingViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Booking.objects.all().order_by('name')
    serializer_class = BookingSerializer
    def create(self, request, *args, **kwargs):
        my_result=send_message(request)
        return HttpResponseRedirect('/success/')

@decorators.api_view(["GET"])
def current_user(request):
        request = request
        token = http_auth = request.META.get('HTTP_AUTHORIZATION', None)
        token = token.replace("Token ", "")
        user_json = json.loads(base64.b64decode(token.split(".")[1]))
        user_id = user_json['id']
        User = get_user_model()
        user_obj = User.objects.get(id=user_id)
        return Response({
        "id": user_obj.id,
    })