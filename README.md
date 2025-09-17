# 🧭 ELD Trip Planner

A full-stack logistics dashboard built with Django + React for tracking trips, generating log sheets, and visualizing routes with map integration.

## 🚀 Features

- Trip creation and management
- Daily log sheet generation with visual timeline
- Route map with pickup, dropoff, and rest stop markers
- OpenRouteService integration
- Tailwind CSS + Vite frontend
- Django REST API backend

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Leaflet
- **Backend:** Django, Django REST Framework
- **Map API:** OpenRouteService

## 🧪 Local Setup

### Backend

```bash
cd eld_backend_clean
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
