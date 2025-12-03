import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Dashboard(){
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (!user) navigate('/login');
    else fetchUserProperties();
  }, [user, navigate]);

  const fetchUserProperties = async () => {
    try {
      const res = await API.get('/properties');
      setProperties(res.data.filter(p => p.seller._id === user.id));
    } catch (err) {
      console.error('Error fetching properties:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="space-x-4">
          <button onClick={() => navigate('/new-property')} className="bg-blue-600 text-white px-4 py-2 rounded">Add Property</button>
          <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
        </div>
      </div>
      <p className="mb-4">Welcome, <strong>{user?.name}</strong>!</p>
      <h2 className="text-2xl font-semibold mb-4">Your Properties</h2>
      {properties.length === 0 ? (
        <p>No properties yet. Create one to get started.</p>
      ) : (
        <div className="grid gap-4">
          {properties.map(p => (
            <div key={p._id} className="border rounded-lg p-4 bg-white shadow">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-gray-600">{p.address}</p>
              <p className="font-bold mt-2">₹{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
