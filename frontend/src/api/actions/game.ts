import { apiService } from "@/lib/axios";

export const getAllGames = async () => {
  const res = await apiService.get("/games");
  return res.data;
};
