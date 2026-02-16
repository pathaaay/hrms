import { getAllCities } from "@/api/actions/location";
import type { ICity } from "@/lib/types/location";
import { useQuery } from "@tanstack/react-query";

export const useFetchAllCities = (
  stateId: number,
): {
  isPending: boolean;
  cities: ICity[] | undefined;
} => {
  const { data: cities, isPending } = useQuery<ICity[]>({
    queryKey: [`all-cities-${stateId}`],
    queryFn: () => getAllCities(stateId),
  });

  return { cities, isPending };
};
