from django.contrib import admin
from .models import Location, Booking
# class CustomUserAdmin(admin.ModelAdmin):
#     model = CustomUser

# admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Location)
admin.site.register(Booking)