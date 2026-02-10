import type { FetchBookedGameSlotsProps } from "@/hooks/game/use-fetch-booked-slots";
import { apiService } from "@/lib/axios";
import type { ConfigureGameSchemaType } from "@/lib/schemas/game-schema";

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

export const bookGameSlot = async (value: any) => {
  const res = await apiService.post(`${GAMES_ENDPOINT}/book-slot`, {
    ...value,
  });
  return res.data;
};

export const deleteGameSlot = async (gameId: number) => {
  const res = await apiService.delete(
    `${GAMES_ENDPOINT}/delete-slot/${gameId}`,
  );
  return res.data;
};

export const configureGame = async (values: ConfigureGameSchemaType) => {
  const res = await apiService.put(`${GAMES_ENDPOINT}/${values.id}/configure`, {
    ...values,
  });
  return res.data;
};
