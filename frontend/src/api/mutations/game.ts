import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { queryClient } from "@/lib/tanstack-query/query-client";
import { bookGameSlot, configureGame, deleteGameSlot } from "../actions/game";

export const useBookGameSlotMutation = () => {
  return useMutation({
    mutationFn: bookGameSlot,
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
    mutationFn: deleteGameSlot,
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

export const useConfigureGameMutation = () => {
  return useMutation({
    mutationFn: configureGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-games"] });
      toast.success("Game settings changed successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to change game settings. Try again later sometime...",
      );
    },
  });
};
