import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import {
  createTravelExpense,
  deleteTravelExpense,
  updateTravelExpense,
} from "@/api/actions/travels/travel-expense";

export const useCreateTravelExpenseMutation = () => {
  return useMutation({
    mutationFn: createTravelExpense,
    onSuccess: () => {
      toast.success("Travel expense added successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        "Failed to add travel expense: " + error?.response?.data.message,
      );
    },
  });
};

export const useUpdateTravelExpenseMutation = () => {
  return useMutation({
    mutationFn: updateTravelExpense,
    onSuccess: () => {
      toast.success("Travel expense updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        "Failed to update travel expense: " + error?.response?.data.message,
      );
    },
  });
};

export const useDeleteTravelExpenseMutation = () => {
  return useMutation({
    mutationFn: deleteTravelExpense,
    onSuccess: () => {
      toast.success("Travel expense deleted successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        "Failed to delete travel expense: " + error?.response?.data.message,
      );
    },
  });
};
