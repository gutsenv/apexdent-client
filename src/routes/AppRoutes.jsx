import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/Layout/AppLayout";
import Home from "@/pages/Home/Home";
import Register from "@/pages/Register/Register";
import Login from "@/pages/Login/Login";
import Profile from "@/pages/Profile/Profile";
import UserDashboard from "@/pages/UserDashboard/UserDashboard";
import AppointmentForm from "@/pages/AppointmentForm/AppointmentForm";
import Appointment from "@/pages/Appointment/Appointment";
import NotFound from "@/pages/NotFound/NotFound";
import PrivateRoutes from "./PrivateRoutes";
import DentistRoutes from "./DentistRoutes";
import UserRoutes from "./UserRoutes";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route exact path="/profile" element={<Profile />} />
            <Route element={<DentistRoutes />}>
              {/* <Route
                exact
                path="/dentist-dashboard"
                element={<DentistDashboard />}
              /> */}
            </Route>
            <Route element={<UserRoutes />}>
              <Route exact path="/dashboard" element={<UserDashboard />} />
              <Route
                exact
                path="/appointment/:appointmentId"
                element={<Appointment />}
              />
              <Route
                exact
                path="/appointment-form"
                element={<AppointmentForm />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
