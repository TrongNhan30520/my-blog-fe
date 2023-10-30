import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// hocs

import useAuth from "../hooks/useAuth";

const ProtectedAuth = ({ routeProtected = true }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!routeProtected) {
    return !user ? (
      <Outlet />
    ) : (
      <Navigate to="/app/dashboard" state={{ from: location }} replace />
    );
  } else {
    return user ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
};

export default ProtectedAuth;
