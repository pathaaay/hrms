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
} from "lucide-react";
import { NavLink } from "react-router";
import { BookGameBtn } from "./book-game-btn";
import { CardContentRow } from "../shared/card-content-row";

interface GameCardProps {
  game: IGame;
  showBookBtn?: boolean;
  showAddBtn?: boolean;
}

export const GameCard = ({
  game,
  showBookBtn = true,
  showAddBtn = false,
}: GameCardProps) => {
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
      {showBookBtn && (
        <CardFooter>
          <Button className="w-full mt-4 rounded-xl" asChild>
            <NavLink to={`/games/${game.id}`}>Book Now</NavLink>
          </Button>
        </CardFooter>
      )}

      {showAddBtn && (
        <CardFooter>
          <BookGameBtn id={game.id} />
        </CardFooter>
      )}
    </Card>
  );
};
