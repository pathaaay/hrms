import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/hooks/use-user";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { logout } from "@/api/actions/auth";

export const UserButton = () => {
  const navigate = useNavigate();
  const { userProfile } = useUser();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage
            src={userProfile?.avatarPathSrc}
            alt={userProfile?.name}
            className="grayscale"
          />
          <AvatarFallback>{userProfile?.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="max-w-72">
        <PopoverHeader className="text-center">
          <PopoverTitle>{userProfile?.name}</PopoverTitle>
          <PopoverDescription>{userProfile?.role}</PopoverDescription>
          <Separator />
          <Button variant={"secondary"} asChild>
            <NavLink to={"/profile"}>Your Profile</NavLink>
          </Button>
          <Button
            className="w-full gap-2 border-red-500 text-red-500 rounded-sm outline-none"
            variant={"outline"}
            onClick={() => {
              logout();
              navigate("/auth/login");
            }}
          >
            <LogOutIcon />
            Logout
          </Button>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
};
