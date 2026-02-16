import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import {
  createTravel,
  deleteTravel,
  updateTravel,
} from "@/api/actions/travels/travel";
import { queryClient } from "@/lib/tanstack-query/query-client";

export const useCreateTravelMutation = () => {
  return useMutation({
    mutationFn: createTravel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-travels"] });
      toast.success("Travel created successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error("Failed to create travel: " + error?.response?.data.message);
    },
  });
};

export const useUpdateTravelMutation = () => {
  return useMutation({
    mutationFn: updateTravel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-travels"] });
      toast.success("Travel updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error("Failed to update travel: " + error?.response?.data.message);
    },
  });
};

export const useDeleteTravelMutation = () => {
  return useMutation({
    mutationFn: deleteTravel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-travels"] });
      toast.success("Travel deleted successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to delete travel",
      );
    },
  });
};
