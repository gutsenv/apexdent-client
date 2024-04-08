import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src={null} alt="@shadcn" />
      <AvatarFallback>
        <p className="text-primary">AD</p>
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
