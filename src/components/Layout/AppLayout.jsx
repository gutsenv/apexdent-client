import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Navbar />
      <div className="mx-5">
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;
