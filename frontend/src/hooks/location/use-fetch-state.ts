import { getAllStates } from "@/api/actions/location";
import type { IState } from "@/lib/types/location";
import { useQuery } from "@tanstack/react-query";

export const useFetchAllStates = (
  countryId: number,
): {
  isPending: boolean;
  states: IState[] | undefined;
} => {
  const { data: states, isPending } = useQuery<IState[]>({
    queryKey: [`all-states-${countryId}`],
    queryFn: () => getAllStates(countryId),
  });

  return { states, isPending };
};
