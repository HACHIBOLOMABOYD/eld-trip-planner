from django.db import models
import json

class Trip(models.Model):
    current_location = models.CharField(max_length=255)
    pickup_location = models.CharField(max_length=255)
    dropoff_location = models.CharField(max_length=255)
    cycle_hours_used = models.IntegerField()
    total_miles = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    # 🗺️ Coordinates for map routing
    pickup_lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    pickup_lng = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    dropoff_lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    dropoff_lng = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    # 🛑 Rest stops stored as JSON string (for SQLite compatibility)
    rest_stops = models.TextField(blank=True, help_text="JSON list of [lat, lng] pairs")

    def get_rest_stops(self):
        try:
            return json.loads(self.rest_stops)
        except Exception:
            return []

    def __str__(self):
        return f"Trip from {self.pickup_location} to {self.dropoff_location}"


class LogSheet(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    date = models.DateField()
    status_blocks = models.JSONField()
    remarks = models.TextField(blank=True)
    recap_7_day = models.IntegerField(default=0)
    recap_8_day = models.IntegerField(default=0)

    def __str__(self):
        return f"LogSheet for {self.trip} on {self.date}"