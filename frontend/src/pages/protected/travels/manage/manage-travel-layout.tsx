import { CustomLoader } from "@/components/common/custol-loader";
import { useFetchAllUsers } from "@/hooks/user/use-fetch-all-users";
import { useHasRole } from "@/hooks/user/use-has-role";
import { useUser } from "@/hooks/user/use-user";
import { emitGoBack } from "@/lib/helpers/events/go-back-event";
import { ROLES } from "@/lib/types/user";
import { useEffect } from "react";
import { Outlet } from "react-router";

export const ManageTravelLayout = () => {
  const { users } = useFetchAllUsers();
  const { isAuthenticated } = useUser();
  const canManage = useHasRole([ROLES.HR, ROLES.MANAGER]);

  useEffect(() => {
    if (isAuthenticated && !canManage) emitGoBack("/travels");
  }, [canManage, isAuthenticated]);

  if (!isAuthenticated) return <CustomLoader />;
  
  return <Outlet context={{ users }} />;
};
