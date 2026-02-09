import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";

export const GoBackBtn = ({ to }: { to: string }) => {
  return (
    <Button variant={"secondary"} className="absolute left-0" asChild>
      <NavLink to={to}>
        <ArrowLeftIcon className="size-4!" />
        Go Back
      </NavLink>
    </Button>
  );
};
