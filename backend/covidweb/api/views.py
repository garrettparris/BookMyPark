from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponseRedirect
import requests
from .serializers import LocationSerializer, BookingSerializer
from .models import Location, Booking
from twilio.rest import Client 
from datetime import datetime

def send_message(request):
    name = request.data.get('name')
    location = request.data.get('location')
    start = request.data.get('start')
    end = request.data.get('end')
    date = request.data.get('date')
    phone_number = request.data.get('phone_number')
    data = requests.get(location)
    jsondata = data.json()
    location_name = jsondata['name']
    location_type = jsondata['type']
    account_sid = 'ACdc82aab8d58ebbe4fdb15e1b84958065' 
    auth_token = '47f948fbd52881a32bf1da463ee04738'
    client = Client(account_sid, auth_token)
    message = client.messages.create( 
                              from_='+18509403611',
                              body=location_name + ' ' + location_type + ' booked from ' + start + ' to ' + end +' on ' + date[:10] + ' by ' + name,
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
    queryset = Booking.objects.all().order_by('name')
    serializer_class = BookingSerializer
    def create(self, request, *args, **kwargs):
        my_result=send_message(request)
        return HttpResponseRedirect('/success/')