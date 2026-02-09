import { useState, type SetStateAction } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { MultiSelect } from "../common/multi-select";
import { useFetchUsersByGameId } from "@/hooks/user/use-fetch-users-by-game-id";
import { useParams } from "react-router";
import { useUser } from "@/hooks/user/use-user";
import { Label } from "../ui/label";
import { createMultiSelectOption } from "@/lib/utils";

export const GameBookingModal = ({
  open,
  setOpen,
  slot,
  date,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  slot: string;
  date: string;
}) => {
  const { gameId } = useParams();
  const { userProfile } = useUser();
  const { users } = useFetchUsersByGameId(Number(gameId));
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const singleGame = userProfile?.interestedGames?.find(
    ({ id }) => id === Number(gameId),
  );

  const options = users?.map((user) =>
    createMultiSelectOption(user.userId.toString(), user.name),
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
          {slot} {date}
        </SheetHeader>
        <div className="px-3 flex flex-col gap-1">
          <Label>Select Players</Label>
          <MultiSelect
            options={options || []}
            maxCount={singleGame?.maxPlayersPerSlot}
            onValueChange={setSelectedValues}
            defaultValue={selectedValues}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
