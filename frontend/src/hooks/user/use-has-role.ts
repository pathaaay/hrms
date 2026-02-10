import type { ROLE } from "@/lib/types/user";
import { useUser } from "./use-user";

export const useHasRole = (roles: ROLE[]) => {
  const { userProfile } = useUser();
  return roles.includes((userProfile?.role?.toLowerCase() as ROLE) || "");
};
