from django.urls import path, include
from rest_framework import routers
from .views import BusViewSet

router = routers.DefaultRouter()
router.register('api/bus', BusViewSet, 'bus')

urlpatterns = router.urls
