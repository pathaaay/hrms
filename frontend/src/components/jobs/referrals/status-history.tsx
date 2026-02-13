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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchReferralStatusHistory } from "@/hooks/job/referral/use-fetch-referral-status-history";
import { ReferralStatusTypes, type IReferral } from "@/lib/types/referral";
import { cn } from "@/lib/utils";

interface IReferralHistoryProps {
  referral: IReferral;
}

export const ReferralStatusHistory = ({ referral }: IReferralHistoryProps) => {
  const { statusHistories, isPending } = useFetchReferralStatusHistory(
    referral.id,
  );
  return (
    <>
      <DialogHeader>
        <DialogTitle>Status History</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <div className="max-h-[70vh] overflow-auto">
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
            {isPending &&
              [1, 2, 3, 4, 5].map((ele) => (
                <TableRow key={ele}>
                  <TableCell colSpan={5} className="w-full">
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            {!isPending &&
              statusHistories?.map((history) => (
                <TableRow key={history.id}>
                  <TableCell className="font-medium max-w-30 flex flex-col">
                    <span
                      className="text-ellipsis overflow-hidden"
                      title={history.changedBy.name}
                    >
                      {history.changedBy.name}
                    </span>
                    <span
                      className="text-ellipsis overflow-hidden"
                      title={history.changedBy.email}
                    >
                      {history.changedBy.email}
                    </span>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-sm",
                      history.oldStatus == ReferralStatusTypes.ACCEPT &&
                        "text-green-500",
                      history.oldStatus == ReferralStatusTypes.REJECT &&
                        "text-destructive",
                      history.oldStatus == ReferralStatusTypes.IN_REVIEW &&
                        "text-yellow-500",
                    )}
                  >
                    {history.oldStatus}
                  </TableCell>
                  <TableCell>-&gt;</TableCell>
                  <TableCell
                    className={cn(
                      "text-sm",
                      history.newStatus == ReferralStatusTypes.ACCEPT &&
                        "text-green-500",
                      history.newStatus == ReferralStatusTypes.REJECT &&
                        "text-destructive",
                      history.newStatus == ReferralStatusTypes.IN_REVIEW &&
                        "text-yellow-500",
                    )}
                  >
                    {history.newStatus}
                  </TableCell>
                  <TableCell className="flex flex-col gap-2 font-medium text-muted-foreground">
                    <span className="">
                      Date: {new Date(history.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                      Time: {new Date(history.createdAt).toLocaleTimeString()}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            {!isPending && statusHistories?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
