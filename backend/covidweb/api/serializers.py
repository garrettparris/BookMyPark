from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Location,Booking

class LocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Location
        fields = ('id','name', 'type', 'area', 'longitude', 'latitude')
class BookingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Booking
        fields = ('id', 'location', 'start', 'end', 'date', 'name', 'phone_number', 'email')
        
User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={
                                     "input_type":   "password"})
    password2 = serializers.CharField(
        style={"input_type": "password"}, write_only=True, label="Confirm password")

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "password2",
            "firstname",
            "lastname",
            "phone number"
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        username = validated_data["username"]
        email = validated_data["email"]
        firstname = validated_data["firstname"]
        lastname = validated_data["lastname"]
        password = validated_data["password"]
        password2 = validated_data["password2"]
        if (email and User.objects.filter(email=email).exclude(username=username).exists()):
            raise serializers.ValidationError(
                {"email": "Email addresses must be unique."})
        if password != password2:
            raise serializers.ValidationError(
                {"password": "The two passwords differ."})
        user = User(username=username, email=email)
        user.set_password(password)
        user.first_name = firstname
        user.last_name = lastname
        user.save()
        return user