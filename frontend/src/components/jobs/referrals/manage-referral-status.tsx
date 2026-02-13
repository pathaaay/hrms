import { useChangeReferralStatusMutation } from "@/api/mutations/referral";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ReferralStatusTypes,
  type IReferral,
  type ReferralStatusType,
} from "@/lib/types/referral";
import { cn } from "@/lib/utils";
import { Loader, PencilIcon } from "lucide-react";
import { useState } from "react";

export const ManageReferralStatus = ({ referral }: { referral: IReferral }) => {
  console.log(referral);
  const { mutateAsync: changeStatus, isPending } =
    useChangeReferralStatusMutation();
  const [open, setOpen] = useState(false);
  const onStatusClick = async (status: ReferralStatusType) => {
    await changeStatus({ referralId: referral.id, status });
    setOpen(false);
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon-xs"}>
          {isPending ? <Loader className="animate-spin" /> : <PencilIcon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
          {Object.entries(ReferralStatusTypes).map(([key, value]) => (
            <DropdownMenuItem
              className={cn(
                "text-sm",
                value == ReferralStatusTypes.ACCEPT &&
                  "text-green-600 hover:text-green-500! hover:bg-green-500/10!",
                value == ReferralStatusTypes.IN_REVIEW &&
                  "text-yellow-500 hover:text-yellow-500! hover:bg-yellow-500/10",
              )}
              key={key}
              disabled={value === referral.status}
              variant={
                value == ReferralStatusTypes.REJECT ? "destructive" : "default"
              }
              onClick={(e) => {
                e.preventDefault();
                onStatusClick(value as ReferralStatusType);
              }}
            >
              {key}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
