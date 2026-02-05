import { useMutation } from "@tanstack/react-query";
import { login } from "../actions/auth";
import toast from "react-hot-toast";

// Login Mutation
export const loginMutation = useMutation({
  mutationFn: login,
  onSuccess: () => {
    toast.success("Login Successfull");
  },
  onError: (error) => {
    toast.error("Failed to add product Error: " + error?.message);
  },
});
