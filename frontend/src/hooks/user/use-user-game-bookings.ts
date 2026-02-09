import { getUserGameBookings } from "@/api/actions/user";
import type { IGameBooking } from "@/lib/types/game";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserGameBookings = () => {
  const { data: bookings, isPending } = useQuery<IGameBooking[]>({
    queryKey: [`user-game-bookings`],
    queryFn: getUserGameBookings,
  });
  return { bookings, isPending };
};
