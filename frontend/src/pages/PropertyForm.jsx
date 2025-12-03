import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function PropertyForm(){
  const [form, setForm] = useState({ title:'', price:'', address:'', lat:'', lng:'', description:'', type:'sale' });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleFile = (e) => setImages(e.target.files);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach(k => fd.append(k, form[k]));
    for (let i=0;i<images.length;i++) fd.append('images', images[i]);
    await API.post('/properties', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl mb-4">Add New Property</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required className="w-full p-2 border rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <input required className="w-full p-2 border rounded" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
        <input className="w-full p-2 border rounded" placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
        <div className="grid grid-cols-2 gap-2">
          <input className="p-2 border rounded" placeholder="Latitude" value={form.lat} onChange={e=>setForm({...form,lat:e.target.value})} />
          <input className="p-2 border rounded" placeholder="Longitude" value={form.lng} onChange={e=>setForm({...form,lng:e.target.value})} />
        </div>
        <select className="w-full p-2 border rounded" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        <textarea className="w-full p-2 border rounded" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <input type="file" multiple accept="image/*" onChange={handleFile} />
        <button className="w-full bg-green-600 text-white p-2 rounded">Create Property</button>
      </form>
    </div>
  );
}
