import { useMutation } from "@tanstack/react-query";
import {
  deleteInAppropriatePost,
  deletePost,
  toggleLike,
} from "../actions/achievement-post";
import { queryClient } from "@/lib/tanstack-query/query-client";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useToggleLikeMutation = () => {
  return useMutation({
    mutationFn: toggleLike,
  });
};

export const useDeletePostMutation = () => {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to delete Post",
      );
    },
  });
};

export const useDeleteInAppropriatePostMutation = () => {
  return useMutation({
    mutationFn: deleteInAppropriatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to delete Post",
      );
    },
  });
};
