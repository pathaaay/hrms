import type { IDocument } from "./document";
import type { IUser } from "./user";

export interface IJob {
  id: number;
  title: string;
  description: string;
  createdBy: IUser;
  jdDocument: IDocument;
  defaultHrEmail: string;
  createdAt: string;
}
