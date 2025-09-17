import React, { useState, useEffect } from 'react';

const LogSheetForm = () => {
  const [trips, setTrips] = useState([]);
  const [formData, setFormData] = useState({
    trip: '',
    date: '',
    status_blocks: '',
    remarks: '',
    recap_7_day: '',
    recap_8_day: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/trips/')
      .then(res => res.json())
      .then(data => setTrips(data))
      .catch(err => console.error('Error fetching trips:', err));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setMessage('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(formData).some(val => val.trim() === '');
    if (isEmpty) {
      setError('❌ All fields are required.');
      return;
    }

    setLoading(true);
    fetch('http://127.0.0.1:8000/api/logsheets/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Submission failed');
        return res.json();
      })
      .then(data => {
        setMessage('✅ Log sheet submitted!');
        setFormData({
          trip: '',
          date: '',
          status_blocks: '',
          remarks: '',
          recap_7_day: '',
          recap_8_day: '',
        });
      })
      .catch(err => {
        console.error('Error:', err);
        setError('❌ Something went wrong. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-6 bg-white shadow-sm">
      <h2 className="text-lg font-bold mb-4">📄 Submit Log Sheet</h2>

      {message && (
        <div className="mb-4 text-sm font-medium text-green-700 bg-green-100 p-2 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 text-sm font-medium text-red-700 bg-red-100 p-2 rounded">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label className="block font-medium mb-1">Trip</label>
        <select
          name="trip"
          value={formData.trip}
          onChange={handleChange}
          required
          className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a trip</option>
          {trips.map(trip => (
            <option key={trip.id} value={trip.id}>
              {trip.pickup_location} → {trip.dropoff_location}
            </option>
          ))}
        </select>
      </div>

      {['date', 'status_blocks', 'remarks', 'recap_7_day', 'recap_8_day'].map(field => (
        <div key={field} className="mb-3">
          <label className="block font-medium mb-1 capitalize">{field.replace(/_/g, ' ')}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
            placeholder={`Enter ${field.replace(/_/g, ' ')}`}
            className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default LogSheetForm;