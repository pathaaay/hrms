import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { updateUser, updateUserInterestedGames } from "../actions/user";
import { queryClient } from "@/lib/tanstack-query/query-client";

export const useEditProfileMutation = () => {
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error("Failed to update profile: " + error?.response?.data.message);
    },
  });
};

export const useUpdateInterestedGamesMutation = () => {
  return useMutation({
    mutationFn: updateUserInterestedGames,
    onSuccess: () => {
      toast.success("Interested games updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        "Failed to update interested games: " + error?.response?.data.message,
      );
    },
  });
};
