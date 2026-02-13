import { useQuery } from "@tanstack/react-query";
import { getAllReferralsAssignedForReview } from "@/api/actions/referrals";
import type { IReferral } from "@/lib/types/referral";

export const useFetchAssignedReferrals = () => {
  const { data: referrals, isPending } = useQuery<IReferral[]>({
    queryKey: ["all-assinged-job-referrals"],
    queryFn: getAllReferralsAssignedForReview,
  });
  return { referrals, isPending };
};
