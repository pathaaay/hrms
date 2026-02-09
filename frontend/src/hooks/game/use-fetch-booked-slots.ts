import { getBookedGameSlots } from "@/api/actions/game";
import type { IGame } from "@/lib/types/game";
import { useQuery } from "@tanstack/react-query";

export interface FetchBookedGameSlotsProps {
  id: number;
  fromDate: string;
  toDate: string;
}

export const useFetchGames = ({
  id,
  fromDate,
  toDate,
}: FetchBookedGameSlotsProps) => {
  const { data: games, isPending } = useQuery<IGame[]>({
    queryKey: ["booked-game-slots"],
    queryFn: () => getBookedGameSlots({ id, fromDate, toDate }),
  });
  return { games, isPending };
};
