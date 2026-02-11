import type { IUser } from "./user";

export interface IJob {
  id: number;
  title: string;
  description: string;
  createdBy: IUser;
  defaultHrEmail: string;
  createdAt: string;
  jobReviewers: IUser[];
  userId: number;
  jdFilePath:string;
}
