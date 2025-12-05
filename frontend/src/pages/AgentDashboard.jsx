import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';

export default function AgentDashboard(){
  const { user } = useContext(AuthContext);
  const [assigned, setAssigned] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        // Try to fetch assigned properties and leads from API
        // Backend may not support these endpoints; fallback to sample data
        const [propRes, leadsRes] = await Promise.all([
          fetch('/api/properties?assigned=true'),
          fetch('/api/leads?assigned=true')
        ]);

        const propText = await propRes.text();
        const leadsText = await leadsRes.text();

        let props = [];
        let leadsData = [];
        try { props = propText ? JSON.parse(propText) : []; } catch { props = []; }
        try { leadsData = leadsText ? JSON.parse(leadsText) : []; } catch { leadsData = []; }

        if (!mounted) return;

        // If API returns none, provide sample data
        if (!Array.isArray(props) || props.length === 0) {
          props = [
            { _id: 'p1', title: 'Luxury Villa', city: 'New Town', price: '₹1.3 Cr', images: [] },
            { _id: 'p2', title: 'Studio Apartment', city: 'Salt Lake', price: '₹14,000/month', images: [] }
          ];
        }
        if (!Array.isArray(leadsData) || leadsData.length === 0) {
          leadsData = [
            { id: 'l1', name: 'Rahul Verma', contact: '98765 43210', interestedIn: 'Luxury Villa' },
            { id: 'l2', name: 'Sneha Roy', contact: '91234 56789', interestedIn: 'Studio Apartment' }
          ];
        }

        setAssigned(props);
        setLeads(leadsData);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError('Failed to load agent data — showing sample content');
        setAssigned([
          { _id: 'p1', title: 'Luxury Villa', city: 'New Town', price: '₹1.3 Cr', images: [] },
          { _id: 'p2', title: 'Studio Apartment', city: 'Salt Lake', price: '₹14,000/month', images: [] }
        ]);
        setLeads([
          { id: 'l1', name: 'Rahul Verma', contact: '98765 43210', interestedIn: 'Luxury Villa' },
          { id: 'l2', name: 'Sneha Roy', contact: '91234 56789', interestedIn: 'Studio Apartment' }
        ]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Agent Dashboard</h1>
            <p className="text-gray-600">Welcome{user?.name ? `, ${user.name}` : ''} — manage your listings and leads</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">New Listing</button>
            <button className="bg-white border border-gray-200 px-4 py-2 rounded">Export</button>
          </div>
        </div>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-6">{error}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Quick stats & Leads */}
          <aside className="space-y-6">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-gray-700">Quick Stats</h3>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-700">{assigned.length}</div>
                  <div className="text-sm text-gray-500">Assigned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{leads.length}</div>
                  <div className="text-sm text-gray-500">Leads</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600">{Math.max(0, assigned.length - 1)}</div>
                  <div className="text-sm text-gray-500">Active Tours</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-gray-700 mb-3">Top Leads</h3>
              <ul className="space-y-2">
                {leads.slice(0,5).map(l => (
                  <li key={l.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{l.name}</div>
                      <div className="text-sm text-gray-500">{l.interestedIn}</div>
                    </div>
                    <div className="text-sm text-gray-600">{l.contact}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-gray-700 mb-3">Quick Actions</h3>
              <div className="flex flex-col gap-2">
                <button className="w-full text-left bg-blue-50 border border-blue-100 px-3 py-2 rounded">Schedule Tour</button>
                <button className="w-full text-left bg-green-50 border border-green-100 px-3 py-2 rounded">Send Offer</button>
                <button className="w-full text-left bg-gray-50 border border-gray-100 px-3 py-2 rounded">Message Lead</button>
              </div>
            </div>
          </aside>

          {/* Main: Assigned properties */}
          <main className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Assigned Properties</h3>
                <div className="text-sm text-gray-500">Showing {assigned.length} properties</div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {[1,2,3].map(s => (
                    <div key={s} className="h-40 bg-gray-100 animate-pulse rounded" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assigned.map(p => (
                    <div key={p._id} className="border rounded overflow-hidden">
                      <PropertyCard property={p} />
                      <div className="p-3 flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded">View</button>
                        <button className="flex-1 bg-white border border-gray-200 py-2 rounded">Edit</button>
                        <button className="flex-1 bg-red-50 text-red-600 border border-red-100 py-2 rounded">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-gray-700 mb-3">Recent Activity</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>🔔 Tour scheduled with Rahul Verma for Luxury Villa — <span className="text-gray-500">Today, 3:00 PM</span></li>
                <li>✉️ Received inquiry from Sneha Roy for Studio Apartment — <span className="text-gray-500">Yesterday</span></li>
                <li>📄 Offer sent to buyer for 2 BHK Apartment — <span className="text-gray-500">2 days ago</span></li>
              </ul>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
