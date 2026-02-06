import { getUser } from "@/api/actions/user";
import { Navbar } from "@/components/common/navbar";
import type { IUserProfile } from "@/lib/types/user";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
const ProtectedLayout = () => {
  const { data, isPending } = useQuery<IUserProfile>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <>
      <Navbar userProfile={data} />
      <Outlet context={{ isPending }} />
    </>
  );
};

export default ProtectedLayout;
