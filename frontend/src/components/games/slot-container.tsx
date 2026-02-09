import type { IGame } from "@/lib/types/game";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { weekDays } from "@/lib/constants";
import { SlotCalendar } from "./slot-calendar";
import { useFetchGameBookedSlots } from "@/hooks/game/use-fetch-booked-slots";

interface BookGameProps {
  game: IGame;
}
export const SlotContainer = ({ game }: BookGameProps) => {
  const today = new Date();
  const fromDate = new Date(
    today.setDate(today.getDate() - today.getDay()),
  ).toISOString();
  const toDate = new Date(
    today.setDate(today.getDate() - today.getDay() + 6),
  ).toISOString();

  const { bookings, isPending } = useFetchGameBookedSlots({
    gameId: game.id,
    fromDate,
    toDate,
  });

  console.log({ bookings, isPending });
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
            <SlotCalendar
              game={game}
              date={date}
              isPending={isPending}
              bookings={bookings || []}
            />
          </div>
        );
      })}
    </div>
  );
};
