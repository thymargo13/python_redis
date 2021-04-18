from django.shortcuts import render
from rest_framework import viewsets, permissions
# Create your views here.
from .models import Bus
from .seriallizers import BusSeriallizer


class BusViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows user to be viewed or edited
    """
    queryset = Bus.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BusSeriallizer

    def perform_create(self, serializer):
        serializer.save()
