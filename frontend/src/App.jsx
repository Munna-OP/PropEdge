import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import PropertyForm from './pages/PropertyForm';
import SearchResults from './pages/SearchResults';
import BecomeSeller from './pages/BecomeSeller';
import BrowseProperties from './pages/BrowseProperties';
import BuyerPortal from './pages/BuyerPortal';
import SellerPortal from './pages/SellerPortal';
import AgentPortal from './pages/AgentPortal';
import AgentDashboard from './pages/AgentDashboard';
import AgentLanding from './pages/AgentLanding';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/browse" element={<BrowseProperties />} />
            <Route path="/become-seller" element={<BecomeSeller />} />
            <Route path="/agent" element={<AgentLanding />} />

            {/* Protected Routes */}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/new-property" element={<ProtectedRoute requiredRole={'seller'}><PropertyForm /></ProtectedRoute>} />

            {/* Portal Routes */}
            <Route path="/portal/buyer" element={<ProtectedRoute requiredRole={'buyer'}><BuyerPortal /></ProtectedRoute>} />
            <Route path="/portal/seller" element={<ProtectedRoute requiredRole={'seller'}><SellerPortal /></ProtectedRoute>} />
            <Route path="/portal/agent" element={<ProtectedRoute requiredRole={'agent'}><AgentPortal /></ProtectedRoute>} />

            {/* Agent Routes */}
            <Route path="/agent-dashboard" element={<ProtectedRoute requiredRole={'agent'}><AgentDashboard /></ProtectedRoute>} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
