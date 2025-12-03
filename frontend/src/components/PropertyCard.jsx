import React from 'react';

export default function PropertyCard({ p }){
  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <img src={p.images?.[0] ? `${process.env.REACT_APP_API_URL.replace('/api','')}${p.images[0]}` : 'https://via.placeholder.com/400x200'} alt={p.title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-semibold mt-2">{p.title}</h3>
      <p className="text-sm text-gray-600">{p.address}</p>
      <div className="mt-2 font-bold">₹{p.price}</div>
    </div>
  );
}
