// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Service/TheProvider';

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/Login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
