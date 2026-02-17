import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import {
  createDocument,
  deleteDocument,
  updateDocument,
} from "@/api/actions/travels/travel-documents";

export const useCreateTravelDocumentMutation = () => {
  return useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      toast.success("Travel document added successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        "Failed to add travel document: " + error?.response?.data.message,
      );
    },
  });
};

export const useUpdateTravelDocumentMutation = () => {
  return useMutation({
    mutationFn: updateDocument,
    onSuccess: () => {
      toast.success("Travel document updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        "Failed to update travel document: " + error?.response?.data.message,
      );
    },
  });
};

export const useDeleteTravelDocumentMutation = () => {
  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      toast.success("Travel document deleted successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        "Failed to delete travel document: " + error?.response?.data.message,
      );
    },
  });
};
