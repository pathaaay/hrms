import type { IGame, IGameBooking } from "@/lib/types/game";
import { generateSlots } from "@/lib/utils";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";

interface BookGameProps {
  game: IGame;
  date: Date;
  isPending: boolean;
  bookings: IGameBooking[];
}

export const SlotCalendar = ({
  date,
  game,
  isPending,
  bookings,
}: BookGameProps) => {
  const navigate = useNavigate();
  const slots = generateSlots({
    startTime: game.startTime,
    endTime: game.endTime,
    duration: game.maxSlotDurationInMinutes,
  });

  return (
    <div className="flex items-center flex-col gap-2">
      {slots.map((slot, i) => {
        if (isPending)
          return (
            <Skeleton
              key={slot.startMinutes + "_" + i}
              className="h-12 w-30"
            ></Skeleton>
          );

        if (
          bookings.some(
            ({ startTime, bookedSlotDate }) =>
              format(bookedSlotDate, "yyyy-MM-dd") ==
                format(date, "yyyy-MM-dd") && startTime == slot.startMinutes,
          )
        )
          return (
            <Button
              key={slot.startMinutes + "_" + i}
              disabled
              className="h-12 w-30 disabled:opacity-30"
            >
              ({slot.formattedTime}) Booked
            </Button>
          );

        return (
          <Button
            key={slot.startMinutes + "_" + i}
            disabled={
              new Date(
                date.setHours(slot.startMinutes / 60, slot.startMinutes % 60),
              ) < new Date()
            }
            onClick={() =>
              navigate(
                `book-slot?startTime=${slot.startMinutes}&endTime=${slot.endMinutes}&date=${format(date,"yyyy-MM-dd")}`,
              )
            }
            variant={"outline"}
            className="h-12 w-30 disabled:opacity-30"
          >
            {slot.formattedTime}
          </Button>
        );
      })}
    </div>
  );
};
