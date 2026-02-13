import type { ROLE } from "@/lib/types/user";
import { useUser } from "./use-user";

export const useHasRole = (roles: ROLE[]) => {
  const { userRole } = useUser();
  return roles.includes((userRole?.toLowerCase() as ROLE) || "");
};
