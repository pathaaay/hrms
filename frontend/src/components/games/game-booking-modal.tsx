import { useRef, useState, type SetStateAction } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { MultiSelect, type MultiSelectRef } from "../common/multi-select";
import { useFetchUsersByGameId } from "@/hooks/user/use-fetch-users-by-game-id";
import { useParams } from "react-router";
import { useUser } from "@/hooks/user/use-user";
import { Label } from "../ui/label";
import { createMultiSelectOption } from "@/lib/utils";
import toast from "react-hot-toast";

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
  const multiSelectRef = useRef<MultiSelectRef>(null);

  const { gameId } = useParams();
  const { userProfile } = useUser();
  const { users } = useFetchUsersByGameId(Number(gameId));
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const singleGame = userProfile?.interestedGames?.find(
    ({ id }) => id === Number(gameId),
  );

  let options = users?.map((user) =>
    createMultiSelectOption(user.userId.toString(), user.name),
  );

  const handleSelectChange = (values: string[]) => {
    if (values.length <= singleGame?.maxPlayersPerSlot!) {
      console.log(multiSelectRef.current?.getSelectedValues());
      setSelectedValues(values);
    } else {
      toast.error("Max player amount reached");
      multiSelectRef.current?.setSelectedValues(selectedValues);
    }
  };

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
            ref={multiSelectRef}
            variant={"secondary"}
            options={options || []}
            hideSelectAll
            defaultValue={selectedValues}
            responsive
            onValueChange={handleSelectChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
