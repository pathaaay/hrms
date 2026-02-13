import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IReferral } from "@/lib/types/referral";

interface IReferralHistoryProps {
  referral: IReferral;
}

export const ReferralStatusHistory = ({ referral }: IReferralHistoryProps) => {
  console.log("history loaded");
  return (
    <DialogHeader>
      <DialogTitle>Status History</DialogTitle>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>From</TableHead>
            <TableHead></TableHead>
            <TableHead>To</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium max-w-40 flex flex-col">
              <span className="text-ellipsis overflow-hidden">
                Aayush Pathak
              </span>
              <span className="text-ellipsis overflow-hidden">
                aayush.pathak@roimaint.com
              </span>
            </TableCell>
            <TableCell>NEW</TableCell>
            <TableCell>-&gt;</TableCell>
            <TableCell>IN Review</TableCell>
            <TableCell>13/02/2026 13:20</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </DialogHeader>
  );
};
