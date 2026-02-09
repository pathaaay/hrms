import { getBookedGameSlots } from "@/api/actions/game";
import type { IGameBooking } from "@/lib/types/game";
import { useQuery } from "@tanstack/react-query";

export interface FetchBookedGameSlotsProps {
  gameId: number;
  fromDate: string;
  toDate: string;
}

export const useFetchGameBookedSlots = ({
  gameId,
  fromDate,
  toDate,
}: FetchBookedGameSlotsProps) => {
  const { data: bookings, isPending } = useQuery<IGameBooking[]>({
    queryKey: [`booked-game-slots-${gameId}`],
    queryFn: () => getBookedGameSlots({ gameId, fromDate, toDate }),
  });
  return { bookings, isPending };
};
