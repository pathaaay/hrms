export interface IGame {
  id: number;
  name: string;
  startTime: number;
  endTime:number;
  bookingCycleHours:number;
  maxSlotDurationInMinutes:number;
  maxPlayersPerSlot:number;
}