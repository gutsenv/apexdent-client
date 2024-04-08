import DentistProfile from "./DentistProfile";
import UserProfile from "./UserProfile";

function Profile() {
  const role = localStorage.getItem("role");
  return role === "dentist" ? <DentistProfile /> : <UserProfile />;
}

export default Profile;
