import type { IGame } from "@/lib/types/game";
import { generateSlots } from "@/lib/utils";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

interface BookGameProps {
  game: IGame;
  date: Date;
}

const GameSlots = ({ date, game }: BookGameProps) => {
  const navigate = useNavigate();
  const slots = generateSlots({
    startTime: game.startTime,
    endTime: game.endTime,
    duration: game.maxSlotDurationInMinutes,
  });

  return (
    <div className="flex items-center flex-col gap-2">
      {slots.map((slot, i) => (
        <Button
          key={slot.startMinutes + "_" + i}
          disabled={
            new Date(
              date.setHours(slot.startMinutes / 60, slot.startMinutes % 60),
            ) < new Date()
          }
          onClick={() =>
            navigate(
              `book-slot?startTime=${slot.startMinutes}&endTime=${slot.endMinutes}&date=${date.toISOString().split("T")[0]}`,
            )
          }
          variant={"outline"}
          className="h-12 w-30 disabled:opacity-30"
        >
          {slot.formattedTime}
        </Button>
      ))}
    </div>
  );
};

export default GameSlots;
