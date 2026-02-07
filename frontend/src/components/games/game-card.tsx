import type { IGame } from "@/lib/types/game";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
        <CardContentRow label={"Max Players"} value={game.maxPlayersPerSlot} />
        <CardContentRow
          label={"Slot Duration"}
          value={game.maxSlotDurationInMinutes + "mins"}
        />
        <CardContentRow
          label={"Booking Cycle"}
          value={game.bookingCycleHours + "hrs"}
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full mt-4 rounded-xl">Book Now</Button>
      </CardFooter>
    </Card>
  );
};

const CardContentRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
};
