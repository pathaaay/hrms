import { useQuery } from "@tanstack/react-query";
import type { IJob } from "@/lib/types/job";
import { getAllReferralsAssignedForReview } from "@/api/actions/referrals";

export const useFetchAssignedReferrals = () => {
  const { data: referrals, isPending } = useQuery<IJob[]>({
    queryKey: ["all-assinged-job-referrals"],
    queryFn: getAllReferralsAssignedForReview,
  });
  return { referrals, isPending };
};
