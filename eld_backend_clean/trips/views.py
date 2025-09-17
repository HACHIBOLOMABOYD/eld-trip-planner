from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Trip, LogSheet
from .serializers import TripSerializer, LogSheetSerializer

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class LogSheetViewSet(viewsets.ModelViewSet):
    queryset = LogSheet.objects.all()
    serializer_class = LogSheetSerializer