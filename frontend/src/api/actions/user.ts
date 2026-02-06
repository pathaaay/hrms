import { apiService } from "@/lib/axios";

export const getUser = async () => {
  const res = await apiService.get("/user");
  return res.data;
};
