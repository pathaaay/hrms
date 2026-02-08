import type { SetStateAction } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

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
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
          {slot} {date}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
