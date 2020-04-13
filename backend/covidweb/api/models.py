from django.db import models
from django.contrib.auth.models import User

class Location(models.Model):
    # access_token = models.CharField(max_lenth=100)
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    type = models.CharField(max_length=15)
    area = models.CharField(max_length=60)
    longitude = models.CharField(max_length=20)
    latitude = models.CharField(max_length=20)
    def __str__(self):
        return self.name
