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
import {
  ClockIcon,
  Gamepad2Icon,
  RepeatIcon,
  TimerIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { NavLink } from "react-router";

interface GameCardProps {
  game: IGame;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-muted">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Gamepad2Icon />
            <span className="text-xl font-semibold">{game.name}</span>
          </div>
          <Badge variant={"secondary"} className="flex items-center gap-1">
            <ClockIcon className="size-3!" />
            {game.startTime}:00 - {game.endTime}:00
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <CardContentRow
          Icon={UsersIcon}
          label={"Max Players"}
          value={game.maxPlayersPerSlot}
        />
        <CardContentRow
          Icon={TimerIcon}
          label={"Slot Duration"}
          value={game.maxSlotDurationInMinutes + " mins"}
        />
        <CardContentRow
          Icon={RepeatIcon}
          label={"Booking Cycle"}
          value={game.bookingCycleHours + " hrs"}
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full mt-4 rounded-xl" asChild>
          <NavLink to={`/games/${game.id}`}>Book Now</NavLink>
        </Button>
      </CardFooter>
    </Card>
  );
};

const CardContentRow = ({
  Icon,
  label,
  value,
}: {
  Icon: LucideIcon;
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Icon className="size-4!" />
        <span>{label}</span>
      </div>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
};
