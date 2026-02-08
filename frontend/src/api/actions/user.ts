import { apiService } from "@/lib/axios";

export const getUser = async () => {
  const res = await apiService.get("/user");
  return res.data;
};

export const updateUser = async () => {
  const res = await apiService.post("/user/update");
  return res.data;
};

export const updateUserInterestedGames = async (gameIds: number[]) => {
  const res = await apiService.post("/user/update-games", {
    gameIds,
  });
  return res.data;
};
