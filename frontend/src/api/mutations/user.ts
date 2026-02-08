import { useMutation } from "@tanstack/react-query";
import { login } from "../actions/auth";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useEditProfileMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error("Failed to update profile: " + error?.response?.data.message);
    },
  });
};
