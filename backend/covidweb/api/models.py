from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import AbstractUser
class Location(models.Model):
    # access_token = models.CharField(max_lenth=100)
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    type = models.CharField(max_length=15)
    area = models.CharField(max_length=60)
    longitude = models.CharField(max_length=20)
    latitude = models.CharField(max_length=20)
    def __str__(self):
        return self.name + ' ' + self.type
class Booking(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    start = models.CharField(max_length=10)
    end = models.CharField(max_length=10)
    date = models.DateField()
    name = models.CharField(max_length=25)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(max_length=254)
    attendees = models.IntegerField()
    owner = models.ForeignKey(User,verbose_name = 'User', on_delete=models.CASCADE)
    def __str__(self):
        return self.name
# class CustomUser(AbstractUser):
#     fav_color = models.CharField(blank=True, max_length=120)

#     # bookings = models.CharField(blank=True, max_length=120)