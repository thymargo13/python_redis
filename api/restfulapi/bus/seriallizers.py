from rest_framework import serializers
from . import models


class BusSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = models.Bus
        fields = '__all__'
