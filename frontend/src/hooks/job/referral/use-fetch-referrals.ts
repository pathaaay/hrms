import { useQuery } from "@tanstack/react-query";
import { getAllReferrals } from "@/api/actions/referrals";
import type { IReferral } from "@/lib/types/referral";

export const useFetchReferrals = () => {
  const { data: referrals, isPending } = useQuery<IReferral[]>({
    queryKey: ["all-referrals"],
    queryFn: getAllReferrals,
  });
  return { referrals, isPending };
};
