import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppointmentService from "@/services/appointmentService";
import moment from "moment";
import { Button } from "../../components/ui/button";
import EditAppointmentForm from "./EditAppointmentForm";

function Appointment() {
  const params = useParams();
  const { appointmentId } = params || {};
  const [appointmentData, setAppointmentData] = useState({});
  const [editMode, setEditMode] = useState(false);

  const fetchAppointmentData = useCallback(async () => {
    try {
      const res = await AppointmentService.getById(appointmentId);
      if (res) {
        setAppointmentData(res);
      }
    } catch (error) {
      console.log(error);
    }
  }, [appointmentId]);

  useEffect(() => {
    fetchAppointmentData();
  }, [appointmentId, fetchAppointmentData]);

  if (editMode)
    return <EditAppointmentForm appointmentData={appointmentData} />;

  return (
    <div className="w-1/3 mx-auto items-center justify-center mt-10 flex flex-col gap-2">
      <p>Dentist: {appointmentData.dentist}</p>
      <p>Schedule: {moment(appointmentData.schedule).format("MMM DD, YYYY")}</p>
      <p>Status: {appointmentData.status}</p>
      <Button className="mt-2" size="sm" onClick={() => setEditMode(true)}>
        Edit
      </Button>
    </div>
  );
}

export default Appointment;
