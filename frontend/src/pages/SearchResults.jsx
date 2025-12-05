import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';

export default function SearchResults(){
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`/api/properties${query ? `?q=${encodeURIComponent(query)}` : ''}`);
        setProperties(response.data);
      } catch (err) {
        setError('Failed to load properties. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProperties();
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="mb-8">
          <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Home</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Search Results</h1>
          {query && (
            <p className="text-lg text-gray-600">
              Showing results for: <span className="font-semibold">{query}</span>
            </p>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading properties...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">No Properties Found</h2>
            <p className="text-gray-600 mb-6">
              {query 
                ? `No properties match your search for "${query}".` 
                : 'Please enter a search term to find properties.'}
            </p>
            <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
              Back to Home
            </Link>
          </div>
        )}

        {!loading && properties.length > 0 && (
          <div>
            <p className="text-gray-600 mb-6">Found {properties.length} property/properties</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
