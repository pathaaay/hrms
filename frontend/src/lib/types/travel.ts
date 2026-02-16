import type { IDocument } from "./document";
import type { IUser } from "./user";

export interface ITravel {
  id: number;
  title: string;
  description: string;
  maxAmountPerDay: 500;
  startDate: string;
  endDate: string;
  createdBy: IUser;
  city: string;
  state: string;
  country: string;
  travelMembers: IUser[];
  createdAt: string;
}

export interface ITravelDocument {
  id: number;
  title: string;
  addedFor: IUser | null;
  document: IDocument;
  createdAt: string;
}
