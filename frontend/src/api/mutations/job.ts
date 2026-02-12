import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  createJob,
  createJobReferral,
  deleteJob,
  referFriendByEmails,
  toggleJob,
  updateJob,
} from "../actions/job";
import { queryClient } from "@/lib/tanstack-query/query-client";

export const useCreateJobMutation = () => {
  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-jobs"] });
      toast.success("Job created successfullu");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to create job",
      );
    },
  });
};

export const useUpdateJobMutation = () => {
  return useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-jobs"] });
      toast.success("Job updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to update job",
      );
    },
  });
};

export const useDeleteJobMutation = () => {
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-jobs"] });
      toast.success("Job deleted successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to delete job",
      );
    },
  });
};

export const useToggleJobMutation = () => {
  return useMutation({
    mutationFn: toggleJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-jobs"] });
      toast.success("Job toggled successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to toggle job",
      );
    },
  });
};

export const useReferFriendByEmailsMutation = () => {
  return useMutation({
    mutationFn: referFriendByEmails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-referrals"] });
      toast.success("Friends referred successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to refer friend",
      );
    },
  });
};

export const useCreateJobReferralMutation = () => {
  return useMutation({
    mutationFn: createJobReferral,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-jobs"] });
      toast.success("Job created successfullu");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to create job",
      );
    },
  });
};
