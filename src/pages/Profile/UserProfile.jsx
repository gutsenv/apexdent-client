import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import useGetUser from "@/hooks/useGetUser";
import formatName from "@/utils/formatName";
import moment from "moment";
import { Button } from "../../components/ui/button";
import UserProfileForm from "./UserProfileForm";

function UserProfile() {
  const [userData] = useGetUser();
  const [editMode, setEditMode] = useState(false);

  if (editMode) return <UserProfileForm userData={userData} />;

  return (
    <div className="w-1/3 mx-auto items-center justify-center mt-10">
      <div className="space-y-1">
        <h4 className="text-lg font-medium leading-none">Profile</h4>
        <p className="text-sm text-muted-foreground">
          These information can be viewed by other users.
        </p>
      </div>
      <Separator className="my-4" />
      <img
        className="rounded-full h-32 w-32 mb-3"
        src="https://github.com/shadcn.png"
        alt="@shadcn"
      />
      <p className="text-md text-muted-foreground">
        Username: {userData.username}
      </p>
      <p className="text-md text-muted-foreground">Email: {userData.email}</p>
      <p className="text-md text-muted-foreground">
        Mobile Number: +63{userData.mobileNumber}
      </p>
      <div className="space-y-1 mt-8">
        <h4 className="text-lg font-medium leading-none">Account</h4>
        <p className="text-sm text-muted-foreground">
          These information are private.
        </p>
      </div>
      <Separator className="my-4" />
      <p className="text-md text-muted-foreground">
        Name:{" "}
        {formatName({
          firstName: userData.firstName,
          middleName: userData.middleName,
          lastName: userData.lastName,
        })}{" "}
      </p>
      <p className="text-md text-muted-foreground">
        Birth Date: {moment(userData.birthDate).format("MMM DD, YYYY")}
      </p>
      <p className="text-md text-muted-foreground mb-8">
        Address: {userData.address}
      </p>
      {!editMode && (
        <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
      )}
    </div>
  );
}

export default UserProfile;
