from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

# Create your models here.

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])


class Bus(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    route_name = models.CharField(max_length=100)
    lat = models.FloatField(blank=True)
    lng = models.FloatField(blank=True)
    station = models.CharField(max_length=100, blank=True)

    class Meta:
        ordering = ['created']
