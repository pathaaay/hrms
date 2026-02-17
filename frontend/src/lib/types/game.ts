import type { IUser } from "./user";

export interface IGame {
  id: number;
  name: string;
  startTime: number;
  endTime: number;
  bookingCycleHours: number;
  maxSlotDurationInMinutes: number;
  maxPlayersPerSlot: number;
  isActive: boolean;
}

export interface IGameBooking {
  id: number;
  startTime: number;
  endTime: number;
  createdAt: string;
  bookedSlotDate: string;
  isConfirmed: boolean;
  team: ITeam;
}

export interface ITeam {
  id: number;
  game: IGame;
  gameTeamMembers: IUser[];
}
