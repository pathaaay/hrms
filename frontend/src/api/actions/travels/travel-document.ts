import { apiService } from "@/lib/axios";
import type { TravelDocumentSchemaType } from "@/lib/schemas/travel/travel-document-schema";

const TRAVEL_DOCUMENT_ENDPOINT = "/travels/documents";

export const getAllDocumentsByTravelId = async (travelId: string) => {
  if (!travelId) return false;
  const res = await apiService.get(`${TRAVEL_DOCUMENT_ENDPOINT}/${travelId}`);
  return res.data;
};

export const createDocument = async (values: TravelDocumentSchemaType) => {
  const res = await apiService.post(
    `${TRAVEL_DOCUMENT_ENDPOINT}/${values.travelId}`,
    {
      ...values,
    },
  );
  return res.data;
};

export const updateDocument = async (values: TravelDocumentSchemaType) => {
  const res = await apiService.put(
    `${TRAVEL_DOCUMENT_ENDPOINT}/${values.travelId}/${values.travelDocumentId}`,
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
    `${TRAVEL_DOCUMENT_ENDPOINT}/${travelId}/${documentId}`,
  );
  return res.data;
};
