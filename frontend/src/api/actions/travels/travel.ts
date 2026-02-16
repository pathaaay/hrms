import { apiService } from "@/lib/axios";
import type { TravelSchemaType } from "@/lib/schemas/travel/travel-schema";

const TRAVELS_ENDPOINT = "/travels";

export const getAllTravels = async () => {
  const res = await apiService.get(TRAVELS_ENDPOINT);
  return res.data;
};

export const createTravel = async (values: TravelSchemaType) => {
  const res = await apiService.post(`${TRAVELS_ENDPOINT}`, {
    ...values,
  });
  return res.data;
};

export const updateTravel = async (values: TravelSchemaType) => {
  const res = await apiService.put(`${TRAVELS_ENDPOINT}/${values.travelId}`, {
    ...values,
  });
  return res.data;
};

export const deleteTravel = async (travelId: number) => {
  const res = await apiService.delete(`${TRAVELS_ENDPOINT}/${travelId}`);
  return res.data;
};
