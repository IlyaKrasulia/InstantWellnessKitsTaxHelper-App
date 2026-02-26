import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const isAuthenticated = Boolean(true);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
