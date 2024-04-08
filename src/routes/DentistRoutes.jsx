import { Outlet, Navigate } from "react-router-dom";

function DentistRoutes() {
  let role = "user";
  return role === "dentist" ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default DentistRoutes;
