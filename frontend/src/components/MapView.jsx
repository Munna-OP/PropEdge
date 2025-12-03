import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '420px' };

export default function MapView({ properties, center }){
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const markers = properties
    .filter(p => p.location && p.location.coordinates)
    .map(p => ({ id: p._id, position: { lat: p.location.coordinates[1], lng: p.location.coordinates[0] }, title: p.title }));

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {markers.map(m => <Marker key={m.id} position={m.position} title={m.title} />)}
      </GoogleMap>
    </LoadScript>
  );
}
