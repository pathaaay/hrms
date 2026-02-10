import type { IUser } from "./user";

export interface IDocument {
  id: number;
  fileType: string;
  filePath: string;
  uploadedBy: IUser;
}
