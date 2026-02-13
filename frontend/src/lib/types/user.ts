import type { IGame } from "./game";

export type ROLE = "manager" | "hr" | "intern" | "employee";

export const ROLES = {
  MANAGER: "manager",
  HR: "hr",
  INTERN: "intern",
  EMPLOYEE: "employee",
};

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
}

export interface IUserProfile {
  userId: number;
  profileId: number;
  name: string;
  email: string;
  managerId: number;
  role: ROLE;
  department: string;
  dateOfBirth: Date;
  dateOfJoining: Date;
  avatarPathSrc: string;
  interestedGames: IGame[];
  city: string;
  state: string;
  country: string;
  timezone: string;
}
