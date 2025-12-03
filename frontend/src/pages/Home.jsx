import React, { useEffect, useState } from 'react';
import API from '../api';
import PropertyCard from '../components/PropertyCard';
import MapView from '../components/MapView';

export default function Home(){
  const [properties, setProperties] = useState([]);
  const [center, setCenter] = useState({ lat: 22.5726, lng: 88.3639 }); // Kolkata default

  useEffect(()=>{ fetchProps(); },[]);
  const fetchProps = async () => {
    const res = await API.get('/properties');
    setProperties(res.data);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Discover properties</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {properties.map(p=> <PropertyCard key={p._id} p={p} />)}
        </div>
        <div className="md:col-span-1">
          <MapView properties={properties} center={center} />
        </div>
      </div>
    </div>
  );
}
