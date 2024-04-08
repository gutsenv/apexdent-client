import { Link } from "react-router-dom";
import ScheduleAppointmentBtn from "../common/ScheduleAppointmentBtn";
import AvatarDropdownMenu from "../common/AvatarDropdownMenu";
import getHomePath from "@/utils/getHomePath";

function Navbar() {
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  return (
    <div className="my-4 mx-8 flex justify-between items-center">
      <Link to={getHomePath(role)}>ApexDent</Link>
      <div className="flex justify-between items-center gap-3">
        <Link to={getHomePath(role)}>{accessToken ? "Dashboard" : "Home"}</Link>
        <ScheduleAppointmentBtn />
        {accessToken ? <AvatarDropdownMenu /> : null}
      </div>
    </div>
  );
}

export default Navbar;
