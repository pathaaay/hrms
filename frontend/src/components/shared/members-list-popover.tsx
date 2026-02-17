import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import type { IUser } from "@/lib/types/user";
import { Separator } from "../ui/separator";

export const MembersListPopover = ({ members }: { members: IUser[] }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date-picker-optional"
          className="w-max justify-between font-normal"
        >
          {members.length}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        {members?.map((member) => (
          <>
            <div
              className="flex flex-col gap-1 p-3 text-xs text-muted-foreground"
              key={member.id}
            >
              <div className="text-foreground">{member.name}</div>
              <div>{member.email}</div>
            </div>
            <Separator />
          </>
        ))}
      </PopoverContent>
    </Popover>
  );
};
