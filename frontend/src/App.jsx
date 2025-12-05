import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PropertyForm from './pages/PropertyForm';
import SearchResults from './pages/SearchResults';
import BecomeSeller from './pages/BecomeSeller';
import BrowseProperties from './pages/BrowseProperties';
import BuyerPortal from './pages/BuyerPortal';
import SellerPortal from './pages/SellerPortal';
import AgentPortal from './pages/AgentPortal';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/browse" element={<BrowseProperties />} />
        <Route path="/become-seller" element={<BecomeSeller />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-property" element={<PropertyForm />} />

        <Route path="/portal/buyer" element={<ProtectedRoute requiredRole={'buyer'}><BuyerPortal /></ProtectedRoute>} />
        <Route path="/portal/seller" element={<ProtectedRoute requiredRole={'seller'}><SellerPortal /></ProtectedRoute>} />
        <Route path="/portal/agent" element={<ProtectedRoute requiredRole={'agent'}><AgentPortal /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
