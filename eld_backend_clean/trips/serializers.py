from rest_framework import serializers
from .models import Trip, LogSheet
import json

class TripSerializer(serializers.ModelSerializer):
    rest_stops = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = [
            'id',
            'current_location',
            'pickup_location',
            'dropoff_location',
            'cycle_hours_used',
            'total_miles',
            'created_at',
            'pickup_lat',
            'pickup_lng',
            'dropoff_lat',
            'dropoff_lng',
            'rest_stops',
        ]

    def get_rest_stops(self, obj):
        try:
            return json.loads(obj.rest_stops)
        except Exception:
            return []

class LogSheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogSheet
        fields = '__all__'