import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('User');
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

