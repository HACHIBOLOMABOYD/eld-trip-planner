import React, { useState } from 'react';

const TripForm = ({ onTripAdded }) => {
  const [formData, setFormData] = useState({
    current_location: '',
    pickup_location: '',
    dropoff_location: '',
    cycle_hours_used: '',
    total_miles: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

    // Basic frontend validation
    const isEmpty = Object.values(formData).some(val => val.trim() === '');
    if (isEmpty) {
      setError('❌ All fields are required.');
      return;
    }

    setLoading(true);
    fetch('http://127.0.0.1:8000/api/trips/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to submit');
        return res.json();
      })
      .then(data => {
        setMessage('✅ Trip added successfully!');
        setFormData({
          current_location: '',
          pickup_location: '',
          dropoff_location: '',
          cycle_hours_used: '',
          total_miles: '',
        });
        onTripAdded();
      })
      .catch(err => {
        console.error('Error:', err);
        setError('❌ Something went wrong. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-6 bg-white shadow-sm">
      <h2 className="text-lg font-bold mb-4">📝 Add New Trip</h2>

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

      {['current_location', 'pickup_location', 'dropoff_location', 'cycle_hours_used', 'total_miles'].map(field => (
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
        className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default TripForm;