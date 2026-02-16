import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/tanstack-query/query-client";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { changeReferralStatus } from "@/api/actions/referrals";

export const useChangeReferralStatusMutation = () => {
  return useMutation({
    mutationFn: changeReferralStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-assinged-job-referrals"],
      });
      toast.success("Referral status changed successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data.message
          ? "Error: " + error?.response?.data.message
          : "Failed to change status",
      );
    },
  });
};
