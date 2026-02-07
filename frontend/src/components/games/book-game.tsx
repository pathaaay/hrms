import type { IGame } from "@/lib/types/game";
import { cn, generateSlots } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { weekDays } from "@/lib/constants";

interface BookGameProps {
  game: IGame;
}
export const BookGame = ({ game }: BookGameProps) => {
  const slots = generateSlots({
    startTime: game.startTime,
    endTime: game.endTime,
    duration: game.maxSlotDurationInMinutes,
  });
  const today = new Date();

  return (
    <div className="flex items-center gap-2">
      {weekDays.map((weekDay, i) => {
        const date = new Date();
        date.setDate(today.getDate() - today.getDay() + i);
        return (
          <div key={weekDay} className="flex flex-col gap-2">
            <div
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "text-center rounded-md font-medium flex flex-col h-max py-1 gap-0 sticky top-14 z-2",
              )}
            >
              <span className="text-lg ">{weekDay.substring(0, 3)}</span>
              <span>{date.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center flex-col gap-2">
              {slots.map((slot) => (
                <Button
                  key={slot}
                  disabled={date < today}
                  variant={"outline"}
                  className="h-12 w-30 disabled:opacity-30"
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
