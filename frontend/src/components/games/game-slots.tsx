import type { IGame } from "@/lib/types/game";
import { generateSlots } from "@/lib/utils";
import { Button } from "../ui/button";
import { NavLink } from "react-router";

interface BookGameProps {
  game: IGame;
  isDisabled: boolean;
  date: Date;
}

const GameSlots = ({ date, game, isDisabled }: BookGameProps) => {
  const slots = generateSlots({
    startTime: game.startTime,
    endTime: game.endTime,
    duration: game.maxSlotDurationInMinutes,
  });

  return (
    <div className="flex items-center flex-col gap-2">
      {slots.map((slot, i) => (
        <Button
          asChild
          key={slot + "_" + i}
          disabled={isDisabled}
          variant={"outline"}
          className="h-12 w-30 disabled:opacity-30"
        >
          <NavLink
            to={`book-slot?slot=${slot}&date=${date.toLocaleDateString()}`}
          >
            {slot}
          </NavLink>
        </Button>
      ))}
    </div>
  );
};

export default GameSlots;
