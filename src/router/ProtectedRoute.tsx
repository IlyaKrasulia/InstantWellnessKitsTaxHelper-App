import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({isLogin}) => {
  const isAuthenticated = Boolean(localStorage.getItem('isLogin'));

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
