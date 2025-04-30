import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../constants/apiConstants';
import { AuthService } from "../services/AuthService";


function PrivateRoute({ children, ...rest }) {
  const token = AuthService.getAccessToken();
  const isAuthenticated = token && !AuthService.isTokenExpired(token);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  }

export default PrivateRoute;