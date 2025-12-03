import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' });
  
  const onSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate('/dashboard');
  };
  
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input type="text" className="w-full p-2 border rounded" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
        <input type="email" className="w-full p-2 border rounded" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} required />
        <input type="password" className="w-full p-2 border rounded" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} required />
        <select className="w-full p-2 border rounded" value={form.role} onChange={e=>setForm({...form, role: e.target.value})}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="agent">Agent</option>
        </select>
        <button className="w-full bg-green-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
