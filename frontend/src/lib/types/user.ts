import type { IGame } from "./game";

export type ROLE = "manager" | "hr" | "intern" | "employee";

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
