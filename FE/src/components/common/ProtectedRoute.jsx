import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken, getUser } from '@/utils/authUtils';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = getToken();
  const user = getUser();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // If user role is not allowed, redirect to their home or dashboard
    if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user?.role === 'recruiter') return <Navigate to="/recruiter/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
