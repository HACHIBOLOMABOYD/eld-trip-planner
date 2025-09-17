import React, { useState, useEffect } from 'react';
import TripForm from './TripForm';
import TripList from './TripList';
import LogSheetForm from './LogSheetForm';
import LogSheetList from './LogSheetList';

import LogSheetCanvas from './LogSheetCanvas';  
import RouteMap from './RouteMap';

function App() {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const fetchTrips = () => {
    fetch('http://127.0.0.1:8000/api/trips/')
      .then(res => res.json())
      .then(data => setTrips(data))
      .catch(err => console.error('Error fetching trips:', err));
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleTripSelect = (tripId) => {
    const trip = trips.find(t => t.id === tripId);
    setSelectedTrip(trip);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">📦 Logistics Dashboard</h1>

      <TripForm onTripAdded={fetchTrips} />

      <TripList trips={trips} onSelectTrip={handleTripSelect} />

      {selectedTrip && (
        <div className="border rounded p-4 shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">🗺️ Trip Route Map</h2>
          <RouteMap
            pickup={[selectedTrip.pickup_lat, selectedTrip.pickup_lng]}
            dropoff={[selectedTrip.dropoff_lat, selectedTrip.dropoff_lng]}
            restStops={selectedTrip.rest_stops || []}
          />
        </div>
      )}

      <LogSheetForm />

      <LogSheetList />
    </div>
  );
}

export default App;