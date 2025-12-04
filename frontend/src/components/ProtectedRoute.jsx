import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }){
  const { user, loading } = useContext(AuthContext);
  if (loading) return null; // or a spinner
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole) return <div className="p-6">Access denied. Your role: {user.role}</div>;
  return children;
}
