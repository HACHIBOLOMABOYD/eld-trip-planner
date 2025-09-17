import React, { useState } from 'react';

const TripForm = () => {
  const [formData, setFormData] = useState({
    current_location: '',
    pickup_location: '',
    dropoff_location: '',
    cycle_hours_used: '',
    total_miles: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/trips/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Trip created:', data);
      alert('Trip added successfully!');
    })
    .catch(err => console.error('Error:', err));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-6">
      <h2 className="text-lg font-bold mb-4">Add New Trip</h2>
      {['current_location', 'pickup_location', 'dropoff_location', 'cycle_hours_used', 'total_miles'].map(field => (
        <div key={field} className="mb-3">
          <label className="block font-medium mb-1">{field.replace(/_/g, ' ')}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default TripForm;