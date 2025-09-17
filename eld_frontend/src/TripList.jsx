import React from 'react';

const TripList = ({ trips }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Trip List</h2>
      <ul className="space-y-2">
        {trips.map(trip => (
          <li key={trip.id} className="border p-2 rounded">
            <strong>{trip.pickup_location}</strong> → {trip.dropoff_location}<br />
            Miles: {trip.total_miles} | Hours Used: {trip.cycle_hours_used}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;