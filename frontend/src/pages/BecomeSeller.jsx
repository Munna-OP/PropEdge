import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function BecomeSeller() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    propertyType: 'residential',
    propertyAddress: '',
    propertyDescription: '',
    expectedPrice: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone must be 10 digits';
    if (!form.propertyAddress.trim()) newErrors.propertyAddress = 'Property address is required';
    if (!form.propertyDescription.trim()) newErrors.propertyDescription = 'Property description is required';
    if (form.propertyDescription.length < 20) newErrors.propertyDescription = 'Description must be at least 20 characters';
    if (!form.expectedPrice) newErrors.expectedPrice = 'Expected price is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/seller-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error('Failed to submit seller request');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: error.message || 'Failed to submit request. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">🏠 Become a Seller</h1>
          <p className="text-gray-600 text-lg">List your property and reach thousands of potential buyers</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6 text-center">
            <h3 className="font-bold text-lg mb-1">✅ Request Submitted!</h3>
            <p>Thank you for registering as a seller. Our team will contact you shortly. Redirecting...</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          
          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Property Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Property Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Property Type *</label>
                  <select
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                    <option value="villa">Villa</option>
                    <option value="apartment">Apartment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Expected Price (₹) *</label>
                  <input
                    type="number"
                    name="expectedPrice"
                    value={form.expectedPrice}
                    onChange={handleChange}
                    placeholder="50,00,000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.expectedPrice && <p className="text-red-500 text-sm mt-1">{errors.expectedPrice}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-2">Property Address *</label>
                <input
                  type="text"
                  name="propertyAddress"
                  value={form.propertyAddress}
                  onChange={handleChange}
                  placeholder="123 Main Street, City, State 12345"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.propertyAddress && <p className="text-red-500 text-sm mt-1">{errors.propertyAddress}</p>}
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-2">Property Description *</label>
                <textarea
                  name="propertyDescription"
                  value={form.propertyDescription}
                  onChange={handleChange}
                  placeholder="Describe your property in detail (bedrooms, bathrooms, amenities, condition, etc.)"
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.propertyDescription && <p className="text-red-500 text-sm mt-1">{errors.propertyDescription}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition duration-200"
              >
                {loading ? 'Submitting...' : 'Submit Seller Request'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition duration-200"
              >
                Cancel
              </button>
            </div>

            <p className="text-gray-600 text-sm text-center">
              * Required fields. We'll verify your information before listing your property.
            </p>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">📋 What happens next?</h3>
          <ul className="text-gray-700 space-y-2">
            <li>✅ Our team reviews your property details</li>
            <li>✅ We contact you to verify information and discuss listing options</li>
            <li>✅ Your property is listed on PropEdge with professional photos and description</li>
            <li>✅ Connect with potential buyers and negotiate deals</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
