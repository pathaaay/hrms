import type { IGame } from "@/lib/types/game";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface GameCardProps {
  game: IGame;
}
export const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-xl font-semibold">{game.name}</span>
          <Badge variant={"secondary"}>
            {game.startTime}:00 - {game.endTime}:00
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <div className="flex justify-between">
          <span>Max Players</span>
          <span className="font-medium text-foreground">
            {game.maxPlayersPerSlot}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Slot Duration</span>
          <span className="font-medium text-foreground">
            {game.maxSlotDurationInMinutes} mins
          </span>
        </div>
        <div className="flex justify-between">
          <span>Booking Cycle</span>
          <span className="font-medium text-foreground">
            {game.bookingCycleHours} hrs
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full mt-4 rounded-xl">Book Now</Button>
      </CardFooter>
    </Card>
  );
};
