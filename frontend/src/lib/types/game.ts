export interface IGame {
  id: number;
  name: string;
  startTime: number;
  endTime: number;
  bookingCycleHours: number;
  maxSlotDurationInMinutes: number;
  maxPlayersPerSlot: number;
  active: boolean;
}

export interface IGameBooking {
  id: number;
  startTime: number;
  endTime: number;
  createdAt: string;
  bookedSlotDate: string;
  confirmed: boolean;
  team: ITeam;
}

export interface ITeam {
  id: number;
  game: IGame;
  gameTeamMembers: {
    id: number;
    name: string;
    email: string;
    role: {
      id: number;
      name: string;
    };
  }[];
}
