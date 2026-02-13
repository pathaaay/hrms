import { useQuery } from "@tanstack/react-query";
import { getReferralStatusHistory } from "@/api/actions/referrals";
import type { IReferralStatusHistory } from "@/lib/types/referral";

export const useFetchReferralStatusHistory = (referralId: number) => {
  const { data: statusHistories, isPending } = useQuery<IReferralStatusHistory[]>({
    queryKey: [`referral-history-${referralId}`],
    queryFn: () => getReferralStatusHistory(referralId),
  });

  return { statusHistories, isPending };
};
