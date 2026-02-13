import { apiService } from "@/lib/axios";
import type { ReferralStatusType } from "@/lib/types/referral";

const REFERRALS_ENDPOINT = "/referrals";

export const getAllReferrals = async () => {
  const res = await apiService.get(REFERRALS_ENDPOINT);
  return res.data;
};

export const getReferralStatusHistory = async (referralId: number) => {
  const res = await apiService.get(
    `${REFERRALS_ENDPOINT}/${referralId}/status-logs`,
  );
  return res.data;
};

export const getAllReferralsAssignedForReview = async () => {
  const res = await apiService.get(`${REFERRALS_ENDPOINT}/assigned-for-review`);
  return res.data;
};

export const changeReferralStatus = async ({
  referralId,
  status,
}: {
  referralId: number;
  status: ReferralStatusType;
}) => {
  const res = await apiService.patch(
    `${REFERRALS_ENDPOINT}/${referralId}/change-status?status=${status}`,
  );
  return res.data;
};
