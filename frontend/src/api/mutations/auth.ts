import { useMutation } from "@tanstack/react-query";
import { login } from "../actions/auth";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login Successfull");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error("Login Failed: " + error?.response?.data.message);
    },
  });
};
