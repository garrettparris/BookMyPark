from django.urls import include, path
from rest_framework import routers
from . import views
from .views import registration

router = routers.DefaultRouter()
router.register(r'locations', views.LocationViewSet)
router.register(r'bookings', views.BookingViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('register/', registration, name='register')

    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]