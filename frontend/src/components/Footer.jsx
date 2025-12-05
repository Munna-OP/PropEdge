import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold mb-4">🏠 PropEdge</h3>
          <p className="text-gray-400">Your trusted real estate platform for buying, selling, and renting properties.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/browse" className="hover:text-white transition">Browse Properties</Link></li>
            <li><Link to="/agent" className="hover:text-white transition">Become Agent</Link></li>
            <li><Link to="/become-seller" className="hover:text-white transition">Become Seller</Link></li>
          </ul>
        </div>

        {/* For Users */}
        <div>
          <h4 className="text-lg font-bold mb-4">For Users</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/login" className="hover:text-white transition">Sign In</Link></li>
            <li><Link to="/register" className="hover:text-white transition">Sign Up</Link></li>
            <li><a href="#" className="hover:text-white transition">How It Works</a></li>
            <li><a href="#" className="hover:text-white transition">Support</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-bold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li>📧 support@propedge.com</li>
            <li>📱 +1 (555) 123-4567</li>
            <li>📍 123 Real Estate Ave, City, State</li>
            <li className="flex gap-3 mt-4">
              <a href="#" className="text-2xl hover:text-blue-400">f</a>
              <a href="#" className="text-2xl hover:text-blue-400">t</a>
              <a href="#" className="text-2xl hover:text-blue-400">in</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
        <p>&copy; 2025 PropEdge. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
