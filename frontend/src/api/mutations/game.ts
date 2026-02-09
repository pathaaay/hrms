import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { BookGameSlot, DeleteGameSlot } from "../actions/game";
import { queryClient } from "@/lib/tanstack-query/query-client";

export const useBookGameSlotMutation = () => {
  return useMutation({
    mutationFn: BookGameSlot,
    onSuccess: () => {
      toast.success("Game Slot Booked successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to book game slot",
      );
    },
  });
};

export const useDeleteGameSlotMutation = () => {
  return useMutation({
    mutationFn: DeleteGameSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-game-bookings"] });
      toast.success("Game booking deleted successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to delete booked game slot",
      );
    },
  });
};
