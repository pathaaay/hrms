export type ReferralStatusType = "NEW" | "IN_REVIEW" | "APPROVED" | "REJECTED";

export const ReferralStatusTypes = {
  NEW: "NEW",
  IN_REVIEW: "IN_REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

export interface IReferral {
  id: number;
  name: string;
  email: string;
  status: ReferralStatusType;
  cvFilePath: string;
  createdAt: string;
  jobTitle: string;
  jdFilePath: string;
}
