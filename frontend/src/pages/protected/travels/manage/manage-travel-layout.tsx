import { useFetchAllUsers } from "@/hooks/user/use-fetch-all-users";
import { Outlet } from "react-router";

export const ManageTravelLayout = () => {
  const { users } = useFetchAllUsers();
  return <Outlet context={{ users }} />;
};
