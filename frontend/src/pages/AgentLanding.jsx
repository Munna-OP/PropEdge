import React from 'react';
import { Link } from 'react-router-dom';

export default function AgentLanding(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-indigo-700 mb-3">Agent on PropEdge</h1>
              <p className="text-gray-700 mb-4">Grow your real estate business with PropEdge — list properties, manage leads, schedule viewings, and close deals faster. Join our network of trusted agents and get access to qualified buyers.</p>

              <div className="flex gap-3">
                <Link to="/login?next=/agent-dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded font-semibold">Sign In</Link>
                <Link to="/register" className="bg-white border border-indigo-200 px-5 py-3 rounded font-semibold">Create Account</Link>
                <Link to="/agent-dashboard" className="bg-indigo-50 text-indigo-800 px-5 py-3 rounded font-semibold">Agent Dashboard (Demo)</Link>
              </div>
            </div>

            <div className="w-full md:w-96">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded">
                <h3 className="font-semibold text-gray-800 mb-2">Why join?</h3>
                <ul className="text-gray-700 list-disc ml-5 space-y-1">
                  <li>Reach thousands of buyers and sellers</li>
                  <li>Manage leads and viewings in one place</li>
                  <li>Performance dashboard and exportable reports</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Featured agent tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white border rounded shadow-sm">
                <h4 className="font-semibold">Lead Manager</h4>
                <p className="text-sm text-gray-600 mt-1">Track incoming leads and progress them through the funnel.</p>
              </div>
              <div className="p-4 bg-white border rounded shadow-sm">
                <h4 className="font-semibold">Listing Builder</h4>
                <p className="text-sm text-gray-600 mt-1">Create beautiful listings with photos and floorplans.</p>
              </div>
              <div className="p-4 bg-white border rounded shadow-sm">
                <h4 className="font-semibold">Scheduling</h4>
                <p className="text-sm text-gray-600 mt-1">Coordinate viewings and auto-notify clients and teams.</p>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Already an agent? <Link to="/agent-dashboard" className="text-indigo-600 hover:underline">Go to your dashboard</Link></p>
        </div>
      </div>
    </div>
  );
}
