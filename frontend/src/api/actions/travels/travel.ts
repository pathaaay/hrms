import { apiService } from "@/lib/axios";

const TRAVELS_ENDPOINT = "/travels";

export const getAllTravels = async () => {
  const res = await apiService.get(TRAVELS_ENDPOINT);
  return res.data;
};
