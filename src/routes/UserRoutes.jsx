import { Outlet, Navigate } from "react-router-dom";

function UserRoutes() {
  const role = localStorage.role;
  return role === "user" ? <Outlet /> : <Navigate to="/dentist-dashboard" />;
}

export default UserRoutes;
