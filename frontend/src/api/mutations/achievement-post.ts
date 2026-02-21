import { useMutation } from "@tanstack/react-query";
import {
  addComment,
  createPost,
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

export const useCreatePostMutation = () => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
      toast.success("Post created successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to create Post",
      );
    },
  });
};

export const useAddCommentMutation = () => {
  return useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      toast.success("Comment added successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to add comment",
      );
    },
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
