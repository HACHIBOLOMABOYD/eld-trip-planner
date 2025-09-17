from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TripViewSet, LogSheetViewSet

router = DefaultRouter()
router.register(r'trips', TripViewSet)
router.register(r'logsheets', LogSheetViewSet)

urlpatterns = [
    path('', include(router.urls)),
]