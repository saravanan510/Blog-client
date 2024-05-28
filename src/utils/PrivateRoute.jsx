import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user.isLoggedIn && localStorage.getItem("token")) {
    return <p>loading...</p>;
  }
  if (!user.isLoggedIn) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default PrivateRoute;
