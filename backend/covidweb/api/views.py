from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponseRedirect

from .serializers import LocationSerializer, BookingSerializer
from .models import Location, Booking

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
    # def post(self, request):
    #     Location.objects.create(
    #         name = request.POST.get('name'),
    #         type = request.POST.get('type'),
    #         area = request.POST.get('area'),
    #         longitude = request.POST.get('longitude'),
    #         latitude = request.POST.get('latitude')

    #     )
    #     return HttpResponseRedirect('/success/')

# Create your views here.
