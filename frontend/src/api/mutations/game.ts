import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { queryClient } from "@/lib/tanstack-query/query-client";
import { BookGameSlot } from "../actions/game";

export const useBookGameSlotMutation = () => {
  return useMutation({
    mutationFn: BookGameSlot,
    onSuccess: () => {
      toast.success("Game Slot Booked successfully");
      queryClient.invalidateQueries({ queryKey: ["game-slots"] });
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
