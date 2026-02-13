import type { IUser } from "./user";

export type ReferralStatusType = "NEW" | "IN_REVIEW" | "APPROVED" | "REJECTED";

export const ReferralStatusTypes = {
  NEW: "NEW",
  IN_REVIEW: "IN_REVIEW",
  ACCEPT: "ACCEPTED",
  REJECT: "REJECTED",
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

export interface IReferralStatusHistory {
  id: number;
  oldStatus: string;
  newStatus: string;
  changedBy: IUser;
  createdAt: Date;
}
