import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ScheduleAppointmentBtn({ showIcon }) {
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (accessToken && role !== "user") return null;

  return (
    <Link to={accessToken ? "/appointment-form" : "/login"}>
      <Button>{showIcon && "+"} Schedule Appointment</Button>
    </Link>
  );
}

export default ScheduleAppointmentBtn;
