import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import  IUser  from "@/model/interfaces/iUser";


interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string; // Optional role requirement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole = "ADMIN" }) => {
  // Safely get and parse user data
  const getUser = (): IUser | null => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  const user = getUser();
  const isAuthorized = user?.rol === requiredRole;

  // Redirect to login if not authorized, otherwise render children
  return isAuthorized ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;