import DataTable from "@/components/common/data-table";
import { GoBackBtn } from "@/components/shared/go-back-btn";
import { Button } from "@/components/ui/button";
import { ENV } from "@/lib/ENV";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, HistoryIcon } from "lucide-react";
import { NavLink } from "react-router";
import { ReferralStatusTypes, type IReferral } from "@/lib/types/referral";
import { Badge } from "@/components/ui/badge";
import { useFetchAssignedReferrals } from "@/hooks/job/referral/use-fetch-assigned-referrals";
import { cn } from "@/lib/utils";
import { ManageReferralStatus } from "@/components/jobs/referrals/manage-referral-status";
import { ReferralStatusHistory } from "@/components/jobs/referrals/status-history";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

let columns: ColumnDef<IReferral>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-2">{row.original.id}</div>,
  },
  {
    header: "Name",
    accessorKey: "name",
    id: "name",
    cell: ({ row }) => (
      <div
        className="text-sm overflow-hidden text-ellipsis max-w-30"
        title={row.original.name}
      >
        {row.original.name || "-"}
      </div>
    ),
  },
  {
    header: "Email",
    accessorKey: "email",
    id: "email",
    cell: ({ row }) => (
      <div
        className="text-xs overflow-hidden text-ellipsis max-w-30"
        title={row.original.email}
      >
        {row.original.email || "-"}
      </div>
    ),
  },
  {
    header: "Cv File",
    accessorKey: "cvFilePath",
    cell: ({ row }) => (
      <Button
        variant={"secondary"}
        size={"xs"}
        asChild
        className="flex text-xs flex-col text-muted-foreground"
      >
        <NavLink
          to={`${ENV.DOCUMENT_PUBLIC_URL}/${row.original.cvFilePath}`}
          target="_blank"
        >
          View CV
        </NavLink>
      </Button>
    ),
  },
  {
    header: "Job Title",
    accessorKey: "jobTitle",
    cell: ({ row }) => (
      <div
        className="text-sm overflow-hidden text-ellipsis max-w-30"
        title={row.original.jobTitle}
      >
        {row.original.jobTitle}
      </div>
    ),
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "JD File",
    accessorKey: "jdFilePath",
    cell: ({ row }) => (
      <Button
        variant={"outline"}
        size={"xs"}
        asChild
        className="flex text-xs text-muted-foreground"
      >
        <NavLink
          to={`${ENV.DOCUMENT_PUBLIC_URL}/${row.original.jdFilePath}`}
          target="_blank"
        >
          View JD
        </NavLink>
      </Button>
    ),
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
    ),
    meta: {
      filterVariant: "calendar",
    },
    filterFn: (row, _, value) => {
      if (!value) return true;

      if (
        format(row.original.createdAt, "yyyy-MM-dd") ==
        format(value, "yyyy-MM-dd")
      )
        return true;
      return false;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    id: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="flex items-center gap-1">
          <Badge
            variant={"secondary"}
            className={cn(
              "capitalize text-xs!",
              status == ReferralStatusTypes.ACCEPT &&
                "bg-green-500/20 text-green-500",
              status == ReferralStatusTypes.REJECT &&
                "bg-destructive/20 text-destructive",
              status == ReferralStatusTypes.IN_REVIEW &&
                "bg-yellow-500/20 text-yellow-500",
            )}
          >
            {status.split("_").join(" ").toLowerCase()}
          </Badge>
          <ManageReferralStatus referral={row.original} />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size={"xs"}>
                <HistoryIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full">
              <ReferralStatusHistory referral={row.original} />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
    meta: {
      filterVariant: "select",
    },
  },
];

export const AssignedReferrals = () => {
  const { referrals, isPending } = useFetchAssignedReferrals();
  return (
    <div className="flex flex-col items-center gap-2 relative">
      <GoBackBtn to={"/jobs"} />
      <div className="flex flex-col gap-3 w-full mt-20">
        <div className="flex items-center justify-between">
          <div className="text-xl font-medium">Assigned Referrals</div>
        </div>
        <div className="flex items-center">
          <DataTable
            columns={columns}
            isLoading={isPending}
            data={referrals || []}
            filterColumns={["jobTitle", "status", "createdAt"]}
          />
        </div>
      </div>
    </div>
  );
};
