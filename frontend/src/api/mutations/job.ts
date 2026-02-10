import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { createJob, updateJob } from "../actions/job";

export const useCreateJobMutation = () => {
  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
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
      toast.success("Job updated successfullu");
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
