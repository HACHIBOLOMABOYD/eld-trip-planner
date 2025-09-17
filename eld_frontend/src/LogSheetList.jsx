import React, { useEffect, useState } from 'react';
import LogSheetCanvas from './LogSheetCanvas';

const LogSheetList = () => {
  const [logsheets, setLogsheets] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch log sheets
    fetch('http://127.0.0.1:8000/api/logsheets/')
      .then(res => res.json())
      .then(data => setLogsheets(data))
      .catch(err => console.error('Error fetching log sheets:', err));

    // Fetch trips for context
    fetch('http://127.0.0.1:8000/api/trips/')
      .then(res => res.json())
      .then(data => setTrips(data))
      .catch(err => console.error('Error fetching trips:', err));
  }, []);

  const getTripDetails = (tripId) => {
    return trips.find(t => t.id === tripId);
  };

  return (
    <div className="p-4 border rounded bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">📄 Daily Log Sheets</h2>
      <ul className="space-y-6">
        {logsheets.map(log => {
          const trip = getTripDetails(log.trip);
          return (
            <li key={log.id} className="border p-4 rounded bg-gray-50">
              <div className="mb-2">
                <strong>Date:</strong> {log.date}
              </div>
              {trip && (
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Trip:</strong> {trip.pickup_location} → {trip.dropoff_location}  
                  | Miles: {trip.total_miles}  
                  | Hours: {trip.cycle_hours_used}
                </div>
              )}
              <div className="mb-2"><strong>Remarks:</strong> {log.remarks}</div>
              <div className="mb-2"><strong>Recap 7-Day:</strong> {log.recap_7_day}</div>
              <div className="mb-2"><strong>Recap 8-Day:</strong> {log.recap_8_day}</div>

              <div className="mt-4">
                <LogSheetCanvas statusBlocks={log.status_blocks} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LogSheetList;