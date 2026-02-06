import type { IUserProfileType } from "@/lib/types/user";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../actions/user";

export const fetchUser = () =>
  useQuery<IUserProfileType>({
    queryKey: ["user-profile"],
    queryFn: getUser,
    retry: 0,
  });
