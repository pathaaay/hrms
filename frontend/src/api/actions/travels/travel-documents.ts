import { apiService } from "@/lib/axios";
import type { TravelDocumentSchemaType } from "@/lib/schemas/travel/travel-documents-schema";

const TRAVEL_DOCUMENTS_ENDPOINT = "/travels/documents";

export const getAllDocumentsByTravelId = async (travelId: string) => {
  if (!travelId) return false;
  const res = await apiService.get(`${TRAVEL_DOCUMENTS_ENDPOINT}/${travelId}`);
  return res.data;
};

export const createDocument = async (values: TravelDocumentSchemaType) => {
  const res = await apiService.post(
    `${TRAVEL_DOCUMENTS_ENDPOINT}/${values.travelId}`,
    {
      ...values,
    },
  );
  return res.data;
};

export const updateDocument = async (values: TravelDocumentSchemaType) => {
  const res = await apiService.put(
    `${TRAVEL_DOCUMENTS_ENDPOINT}/${values.travelId}/${values.travelDocumentId}`,
    {
      ...values,
    },
  );
  return res.data;
};

export const deleteDocument = async ({
  documentId,
  travelId,
}: {
  travelId: number;
  documentId: number;
}) => {
  const res = await apiService.delete(
    `${TRAVEL_DOCUMENTS_ENDPOINT}/${travelId}/${documentId}`,
  );
  return res.data;
};
