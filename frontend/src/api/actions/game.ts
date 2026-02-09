import type { FetchBookedGameSlotsProps } from "@/hooks/game/use-fetch-booked-slots";
import { apiService } from "@/lib/axios";

const GAMES_ENDPOINT = "/games";

export const getAllGames = async () => {
  const res = await apiService.get(GAMES_ENDPOINT);
  return res.data;
};

export const getBookedGameSlots = async ({
  gameId,
  fromDate,
  toDate,
}: FetchBookedGameSlotsProps) => {
  const res = await apiService.post(`${GAMES_ENDPOINT}/get-booked-slots`, {
    gameId,
    fromDate,
    toDate,
  });
  return res.data;
};

export const BookGameSlot = async (value: any) => {
  const res = await apiService.post(`${GAMES_ENDPOINT}/book-slot`, {
    ...value,
  });
  return res.data;
};

export const DeleteGameSlot = async (gameId: number) => {
  const res = await apiService.delete(`${GAMES_ENDPOINT}/delete-slot/${gameId}`);
  return res.data;
};
