import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { createDocument } from "@/api/actions/travels/travel-documents";

export const useCreateTravelDocumentMutation = () => {
  return useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      toast.success("Travel document uploaded successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        "Failed to upload travel document: " + error?.response?.data.message,
      );
    },
  });
};
