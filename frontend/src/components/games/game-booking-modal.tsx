import { useRef, useState, type SetStateAction } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { MultiSelect, type MultiSelectRef } from "../common/multi-select";
import { useFetchUsersByGameId } from "@/hooks/user/use-fetch-users-by-game-id";
import { useParams, useSearchParams } from "react-router";
import { useUser } from "@/hooks/user/use-user";
import { Label } from "../ui/label";
import { createMultiSelectOption, formatMinutesToHours } from "@/lib/utils";
import toast from "react-hot-toast";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useBookGameSlotMutation } from "@/api/mutations/game";

export const GameBookingModal = ({
  open,
  setOpen,
  date,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  date: string;
}) => {
  const { gameId } = useParams();
  const { userProfile } = useUser();
  const { mutate: bookSlot, isPending } = useBookGameSlotMutation();
  const [searchParams] = useSearchParams();
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  const multiSelectRef = useRef<MultiSelectRef>(null);
  const { users } = useFetchUsersByGameId(Number(gameId));
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const singleGame = userProfile?.interestedGames?.find(
    ({ id }) => id === Number(gameId),
  );

  const options = users?.map((user) =>
    createMultiSelectOption(user.userId.toString(), user.name),
  );

  const handleSelectChange = (values: string[]) => {
    if (values.length < singleGame?.maxPlayersPerSlot!) {
      setSelectedValues(values);
    } else {
      toast.error("Max player amount reached");
      multiSelectRef.current?.setSelectedValues(selectedValues);
    }
  };

  const handleSubmit = () => {
    if (selectedValues.length < 2) {
      toast.error("Minimum 2 player is required to book a slot");
      return;
    }

    const data = {
      gameId,
      userIds: [userProfile?.userId, ...selectedValues.map(Number)],
      startTime: Number(startTime),
      endTime: Number(endTime),
      leaderId: userProfile?.userId,
      bookingDate: date,
    };
    bookSlot(data);
  };

    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Game: {singleGame?.name}</SheetTitle>
            <SheetDescription>
              Book {singleGame?.name} with your friends
            </SheetDescription>
            <Separator />
            <div className="flex items-center gap-2 text-muted-foreground">
              Date: <span className="font-medium text-black">{date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              Start Time:{" "}
              <span className="font-medium text-black">
                {formatMinutesToHours(Number(startTime))}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              End Time:{" "}
              <span className="font-medium text-black">
                {formatMinutesToHours(Number(endTime))}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              Leader:{" "}
              <span className="font-medium text-black">
                {userProfile?.name}
              </span>
            </div>
          </SheetHeader>
          <div className="px-3 flex flex-col gap-1">
            <Label>
              Select more {singleGame?.maxPlayersPerSlot! - 1} Players
            </Label>
            <MultiSelect
              ref={multiSelectRef}
              variant={"secondary"}
              options={options || []}
              hideSelectAll
              defaultValue={selectedValues}
              closeOnSelect={
                selectedValues.length === singleGame?.maxPlayersPerSlot! - 2
              }
              responsive
              onValueChange={handleSelectChange}
            />
          </div>
          <SheetFooter>
            <Button
              onClick={handleSubmit}
              disabled={isPending || selectedValues.length < 2}
            >
              {isPending ? "Please wait..." : "Book Now"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
};
