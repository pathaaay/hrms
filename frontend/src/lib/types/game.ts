export interface IGame {
  id: number;
  name: string;
  startTime: number;
  endTime: number;
  bookingCycleHours: number;
  maxSlotDurationInMinutes: number;
  maxPlayersPerSlot: number;
}

export interface IGameBooking {
  id: number;
  startTime: number;
  endTime: number;
  createdAt: string;
  bookedSlotDate: string;
  confirmed: boolean;
}
