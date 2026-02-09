import { apiService } from "@/lib/axios";
import type { EditProfileSchemaType } from "@/lib/schemas/profile-schema";

const USER_ENDPOINT = "/user";

export const getUser = async () => {
  const res = await apiService.get(USER_ENDPOINT);
  return res.data;
};

export const getAllUsers = async (gameId?: number) => {
  const res = await apiService.get(`${USER_ENDPOINT}/all`, {
    params: gameId ? { gameId } : null,
  });
  return res.data;
};

export const updateUser = async (values: EditProfileSchemaType) => {
  const res = await apiService.post(`${USER_ENDPOINT}/update`, {
    ...values,
  });
  return res.data;
};

export const updateUserInterestedGames = async (gameIds: number[]) => {
  const res = await apiService.post(`${USER_ENDPOINT}/update-games`, {
    gameIds,
  });
  return res.data;
};

export const getUserGameBookings = async () => {
  const res = await apiService.get(`${USER_ENDPOINT}/game-bookings`);
  return res.data;
};