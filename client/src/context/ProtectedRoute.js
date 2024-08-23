import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust path as needed

const ProtectedRoute = ({ element, requiredRole = [] }) => {
  const { userDetails } = useAuth();
  console.log(userDetails);
  // Check if still loading

  if (!userDetails) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (
    !Array.isArray(requiredRole) ||
    !requiredRole.includes(userDetails.role)
  ) {
    // Redirect to an unauthorized page if the role is not allowed
    return <Navigate to="/unauthorized" />;
  }
  return element;
};

export default ProtectedRoute;
