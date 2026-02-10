import { useHasRole } from "@/hooks/user/use-has-role";
import { Outlet } from "react-router";

export const JobsLayout = () => {
  const canCreateJob = useHasRole(["hr"]);
  return (
    <div>
      <Outlet context={{ canCreateJob }} />
    </div>
  );
};
