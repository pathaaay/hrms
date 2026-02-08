import { apiService } from "@/lib/axios";
import type { EditProfileSchemaType } from "@/lib/schemas/profile-schema";

export const getUser = async () => {
  const res = await apiService.get("/user");
  return res.data;
};

export const getAllUsers = async (gameId?: number) => {
  const res = await apiService.get("/user/all", {
    params: gameId ? { gameId } : null,
  });
  return res.data;
};

export const updateUser = async (values: EditProfileSchemaType) => {
  const res = await apiService.post("/user/update", {
    ...values,
  });
  return res.data;
};

export const updateUserInterestedGames = async (gameIds: number[]) => {
  const res = await apiService.post("/user/update-games", {
    gameIds,
  });
  return res.data;
};
