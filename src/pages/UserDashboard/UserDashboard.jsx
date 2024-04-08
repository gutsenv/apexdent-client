import { useCallback, useEffect, useState } from "react";
import ScheduleAppointmentBtn from "@/components/common/ScheduleAppointmentBtn";
import AppointmentService from "@/services/appointmentService";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [appointments, setAppointments] = useState([]);

  const fetchAllAppointments = async () => {
    try {
      const res = await AppointmentService.getAll(localStorage.getItem("id"));
      if (res) {
        setAppointments(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  const handleCancelAppointment = useCallback(async (appointmentId) => {
    try {
      const res = await AppointmentService.cancelById(appointmentId);

      if (res) {
        fetchAllAppointments();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const renderAppointments = useCallback(() => {
    if (!appointments.length)
      return <p className="text-muted-foreground">No scheduled appointments</p>;

    return appointments.map((a) => (
      <div
        key={a._id}
        className="w-52 border border-stone-300 px-4 py-2 rounded-md flex flex-col gap-1"
      >
        <p className="truncate overflow-hidden text-sm">Dentist: {a.dentist}</p>
        <p className="text-sm">
          Schedule: {moment(a.schedule).format("MMM DD, YYYY")}
        </p>
        <p className="text-sm">Status: {a.status}</p>
        <div className="flex gap-2 mt-2">
          <Link to={`/appointment/${a._id}`}>
            <Button size="sm">View</Button>
          </Link>
          {a.status !== "Cancelled" && (
            <Button size="sm" onClick={() => handleCancelAppointment(a._id)}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    ));
  }, [appointments, handleCancelAppointment]);

  return (
    <div className="w-3/4 mx-auto items-center justify-center mt-10">
      <ScheduleAppointmentBtn showIcon />
      <p className="my-8">Scheduled Appointments</p>
      <div className="flex flex-wrap gap-4">{renderAppointments()}</div>
    </div>
  );
}

export default UserDashboard;
