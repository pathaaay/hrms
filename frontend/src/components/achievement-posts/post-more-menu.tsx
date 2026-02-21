import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, PencilIcon } from "lucide-react";
import { DeletePostBtn } from "./delete-post-btn";
import { useState } from "react";

export const MoreMenu = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <PencilIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeletePostBtn id={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
