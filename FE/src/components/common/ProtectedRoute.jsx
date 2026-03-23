import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '@/utils/authUtils';

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
