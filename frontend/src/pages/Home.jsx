import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import PropertyCard from '../components/PropertyCard';

export default function Home(){
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await API.get('/properties');
      setProperties(res.data || []);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const featuredProperties = properties.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Home Today</h1>
          <p className="text-2xl mb-8 text-blue-100">Discover thousands of properties and connect with agents</p>
          <p className="text-lg mb-12 text-blue-100">Your one-stop platform for buying, selling, and renting properties</p>

          {/* SEARCH BAR */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2 mb-8">
            <input
              type="text"
              placeholder="Search properties by location, type, or price..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Search
            </button>
          </form>

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/register?role=buyer')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Sign Up to Buy
            </button>
            <button
              onClick={() => navigate('/become-seller')}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition border-2 border-white"
            >
              Become a Seller
            </button>
            <button
              onClick={() => navigate('/agent')}
              className="bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-400 transition border-2 border-white"
            >
              Join as Agent
            </button>
          </div>
        </div>
      </div>

      {/* FEATURED PROPERTIES SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-xl text-gray-600">Handpicked properties for you</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading properties...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : featuredProperties.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featuredProperties.map(p => (
              <PropertyCard key={p._id} p={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No properties available yet</p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => navigate('/browse')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            View All Properties →
          </button>
        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How PropEdge Works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">1. Search</h3>
              <p className="text-gray-600">Browse thousands of properties by location, price, and features</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2">2. Connect</h3>
              <p className="text-gray-600">Chat with agents and sellers to get more information</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="text-4xl mb-4">🏡</div>
              <h3 className="text-xl font-bold mb-2">3. Visit</h3>
              <p className="text-gray-600">Schedule tours and visit properties that interest you</p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">4. Decide</h3>
              <p className="text-gray-600">Make an offer and complete your real estate journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose PropEdge?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6">
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold mb-2">Verified Properties</h3>
            <p className="text-gray-600">All properties are verified and authenticated</p>
          </div>
          <div className="p-6">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-2xl font-bold mb-2">Expert Agents</h3>
            <p className="text-gray-600">Connect with experienced real estate professionals</p>
          </div>
          <div className="p-6">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-2">Fast Process</h3>
            <p className="text-gray-600">Quick and seamless buying, selling, or renting</p>
          </div>
        </div>
      </div>

      {/* FINAL CTA SECTION */}
      <div className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Dream Property?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of satisfied buyers, sellers, and agents on PropEdge</p>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}
