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
import { CardContentRow } from "../shared/card-content-row";
import { useHasRole } from "@/hooks/user/use-has-role";
import { ConfigureGameDialog } from "./dialog/configure-game-dialog";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: IGame;
  showBookBtn?: boolean;
}

export const GameCard = ({ game, showBookBtn = true }: GameCardProps) => {
  const canConfigureGame = useHasRole(["hr", "manager"]);

  return (
    <Card
      className={cn(
        "rounded-2xl h-max shadow-md hover:shadow-xl transition-all duration-300 border-muted",
        !game.isActive && "border-red-800",
      )}
    >
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
      <CardFooter className="flex items-center gap-1">
        {canConfigureGame && <ConfigureGameDialog gameId={game.id} />}
        {game.isActive && showBookBtn && (
          <Button className="rounded-xl flex-1" asChild>
            <NavLink to={`/games/${game.id}`}>Book Now</NavLink>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
