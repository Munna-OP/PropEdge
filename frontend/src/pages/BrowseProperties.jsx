import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';

export default function BrowseProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchProperties = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('/api/properties');
        if (!mounted) return;
        setProperties(res.data || []);
      } catch (err) {
        console.error('Failed to load properties', err);
        if (!mounted) return;
        setError('Failed to load properties. Showing sample listings.');
        // fallback sample properties
        setProperties([
          { _id: '1', title: '2 BHK Apartment', city: 'Kolkata', price: '₹45,00,000', images: [] },
          { _id: '2', title: 'Luxury Villa', city: 'New Town', price: '₹1.3 Cr', images: [] },
          { _id: '3', title: 'Rental Flat', city: 'Salt Lake', price: '₹14,000/month', images: [] },
        ]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProperties();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Browse Properties</h2>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        )}

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="text-center py-12 text-gray-600">No properties found.</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <PropertyCard key={p._id || p.title} property={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
