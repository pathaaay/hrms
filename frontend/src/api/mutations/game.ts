import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { BookGameSlot } from "../actions/game";

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
