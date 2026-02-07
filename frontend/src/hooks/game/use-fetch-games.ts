import { getAllGames } from "@/api/actions/game";
import type { IGame } from "@/lib/types/game";
import { useQuery } from "@tanstack/react-query";

export const useFetchGames = (): {
  games: IGame[] | undefined;
  isPending: boolean;
} => {
  const { data: games, isPending } = useQuery<IGame[]>({
    queryKey: ["all-games"],
    queryFn: getAllGames,
  });
  return { games, isPending };
};
