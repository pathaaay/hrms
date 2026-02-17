import type { IDocument } from "./document";
import type { IUser } from "./user";

export interface ITravel {
  id: number;
  title: string;
  description: string;
  maxAmountPerDay: number;
  startDate: string;
  endDate: string;
  createdBy: IUser;
  city: string;
  state: string;
  country: string;
  countryId: number;
  stateId: number;
  cityId: number;
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

export interface ITravelExpense {
  id: number;
  amount: number;
  isApproved: boolean;
  remarks: string;
  createdAt: string;
  expenseDate: string;
  description: string;
  expenseProofDocument: IDocument;
  expenseCategory: ITravelExpenseCategory;
}

export interface ITravelExpenseCategory {
  id: number;
  name: string;
  maxAmount: number;
}
