import { getUser } from "@/api/actions/user";
import type { IUserProfile } from "@/lib/types/user";
import { setUser } from "@/store/slices/user-slice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useFetchUser = (): { isPending: boolean } => {
  const dispatch = useDispatch();
  const { data, isPending } = useQuery<IUserProfile>({
    queryKey: ["user"],
    queryFn: getUser,
  });
  dispatch(setUser(data));
  return { isPending };
};
