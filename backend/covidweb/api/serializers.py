from rest_framework import serializers

from .models import Location,Booking

class LocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Location
        fields = ('id','name', 'type', 'area', 'longitude', 'latitude')
class BookingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Booking
        fields = ('id','location', 'start', 'end', 'date','name','phone_number','email')