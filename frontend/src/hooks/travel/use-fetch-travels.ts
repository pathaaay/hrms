import { getAllTravels } from "@/api/actions/travels/travel";
import type { ITravel } from "@/lib/types/travel";
import { setTravels, setCreatedTravels } from "@/store/slices/travel-slice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "../user/use-user";

export const useFetchAllTravels = (): {
  isPending: boolean;
} => {
  const dispatch = useDispatch();
  const { userProfile } = useUser();

  const { data: travels, isPending } = useQuery<ITravel[]>({
    queryKey: [`all-travels`],
    queryFn: () => getAllTravels(),
  });

  useEffect(() => {
    if (travels != null) {
      dispatch(
        setTravels(
          travels.filter(({ travelMembers }) =>
            travelMembers.some(({ id }) => id == userProfile?.userId),
          ),
        ),
      );
      dispatch(
        setCreatedTravels(
          travels.filter(
            ({ createdBy }) => createdBy.id === userProfile?.userId,
          ),
        ),
      );
    }
  }, [travels, dispatch]);

  return { isPending };
};
