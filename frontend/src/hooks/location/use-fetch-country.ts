import { getAllCountries } from "@/api/actions/location";
import type { ICountry } from "@/lib/types/location";
import { useQuery } from "@tanstack/react-query";

export const useFetchAllCountries = (): {
  isPending: boolean;
  countries: ICountry[] | undefined;
} => {
  const { data: countries, isPending } = useQuery<ICountry[]>({
    queryKey: [`all-countries`],
    queryFn: () => getAllCountries(),
  });

  return { countries, isPending };
};
