import { useMutation } from "@tanstack/react-query";
import { uploadDocument } from "../actions/document";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useDocumentMutation = ():any => {
  return useMutation({
    mutationFn: uploadDocument,
    // onSuccess: (data) => {
    //   return data;
    // },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to upload document",
      );
    },
  });
};
