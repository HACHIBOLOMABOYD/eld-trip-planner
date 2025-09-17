import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RouteMap = ({ pickup, dropoff, restStops = [] }) => {
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await axios.post(
          'https://api.openrouteservice.org/v2/directions/driving-car',
          {
            coordinates: [pickup, ...restStops, dropoff],
          },
          {
            headers: {
              Authorization: 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjY5YTIzYjRhYjYyYTQxY2E4YmRmNzYzZmM5MDVlMzM3IiwiaCI6Im11cm11cjY0In0=',
              'Content-Type': 'application/json',
            },
          }
        );

        const coords = res.data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        setRouteCoords(coords);
      } catch (err) {
        console.error('Error fetching route:', err);
      }
    };

    fetchRoute();
  }, [pickup, dropoff, restStops]);

  return (
    <MapContainer center={pickup} zoom={6} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker position={pickup}>
        <Popup>Pickup</Popup>
      </Marker>

      <Marker position={dropoff}>
        <Popup>Dropoff</Popup>
      </Marker>

      {restStops.map((stop, i) => (
        <Marker key={i} position={stop}>
          <Popup>Rest Stop {i + 1}</Popup>
        </Marker>
      ))}

      {routeCoords.length > 0 && <Polyline positions={routeCoords} color="blue" />}
    </MapContainer>
  );
};

export default RouteMap;