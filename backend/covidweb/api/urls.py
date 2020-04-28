from django.urls import include, path
from rest_framework import routers
from . import views
from .views import registration
from .views import current_user
from .views import MyTokenObtainPairView
router = routers.DefaultRouter()
router.register(r'locations', views.LocationViewSet)
router.register(r'bookings', views.BookingViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('register/', registration, name='register'),
    path('current/', current_user, name='current'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

]