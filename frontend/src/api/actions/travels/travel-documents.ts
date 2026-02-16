import { apiService } from "@/lib/axios";
import type { TravelDocumentSchemaType } from "@/lib/schemas/travel/document-schema";

const TRAVELS_ENDPOINT = "/travels/documents";

export const getAllDocumentsByTravelId = async (travelId: string) => {
  const res = await apiService.get(`${TRAVELS_ENDPOINT}/${travelId}`);
  return res.data;
};

export const createDocument = async (values: TravelDocumentSchemaType) => {
  const res = await apiService.post(`${TRAVELS_ENDPOINT}/${values.travelId}`, {
    ...values,
  });
  return res.data;
};
