import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider.jsx";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, setRedirect } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return element;
};

export default PrivateRoute;
