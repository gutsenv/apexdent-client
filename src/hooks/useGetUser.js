import { useEffect, useState } from "react";
import UserService from "@/services/userService";

function useGetUser() {
  const userId = localStorage.getItem("id");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    UserService.getUser(userId)
      .then((res) => setUserData(res))
      .catch((err) => console.log(err));
  }, [userId]);

  return [userData];
}

export default useGetUser;
