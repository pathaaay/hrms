import { DeleteTravelExpenseBtn } from "@/components/travels/expenses/delete-travel-expense-btn";
import { TravelExpenseFormDialog } from "@/components/travels/expenses/travel-expense-form-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ENV } from "@/lib/ENV";
import type { ITravelExpense } from "@/lib/types/travel";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { PencilIcon } from "lucide-react";
import { NavLink } from "react-router";

export const travelExpenseColumns: ColumnDef<ITravelExpense>[] = [
  {
    header: "Amount",
    accessorKey: "amount",
    id: "amount",
    cell: ({ row }) => (
      <div className="text-sm overflow-hidden text-ellipsis max-w-30">
        ${row.original.amount}
      </div>
    ),
  },
  {
    header: "Description",
    accessorKey: "description",
    id: "description",
    cell: ({ row }) => (
      <div
        className="text-xs overflow-hidden text-ellipsis max-w-30"
        title={row.original.description}
      >
        {row.original.description}
      </div>
    ),
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
    header: "Proof",
    accessorKey: "proofDocument",
    cell: ({ row }) => (
      <Button variant={"secondary"} size={"sm"}>
        <NavLink
          to={`${ENV.DOCUMENT_PUBLIC_URL}/${row.original.expenseProofDocument.filePath}`}
          target="_blank"
        >
          View
        </NavLink>
      </Button>
    ),
  },
  {
    header: "Status",
    accessorKey: "isApproved",
    id: "isApproved",
    cell: ({ row }) => {
      const status =
        row.original.isApproved == null
          ? "Pending"
          : row.original.isApproved
            ? "Approved"
            : "Rejected";
      return (
        <Badge
          variant={
            status === "Approved"
              ? "default"
              : status === "Rejected"
                ? "destructive"
                : "secondary"
          }
        >
          {status}
        </Badge>
      );
    },
    meta: {
      filterVariant: "select",
      filterLabels: {
        null: "Pending",
        true: "Approved",
        false: "Rejected",
      },
    },
    filterFn: (row, _, value) => {
      if (!value) return true;

      if (
        (value == "null" && row.original.isApproved == null) ||
        (value == "true" && row.original.isApproved) ||
        (value == "false" &&
          !row.original.isApproved &&
          row.original.isApproved != null)
      )
        return true;
      return false;
    },
  },
  {
    header: "Remarks",
    accessorKey: "remarks",
    id: "remarks",
    cell: ({ row }) => (
      <div
        className="text-xs overflow-hidden text-ellipsis max-w-30"
        title={row.original.remarks}
      >
        {row.original.remarks || "-"}
      </div>
    ),
  },
  {
    header: "Category",
    accessorKey: "expenseCategory.name",
    id: "expenseCategory.name",
    cell: ({ row }) => (
      <div
        className="text-xs overflow-hidden text-ellipsis max-w-30"
        title={row.original.expenseCategory.name}
      >
        {row.original.expenseCategory.name || "-"}
      </div>
    ),
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {
          <>
            <DeleteTravelExpenseBtn id={row.original.id} />
            <TravelExpenseFormDialog
              travelExpense={row.original}
              trigger={
                <Button variant={"outline"} size={"icon"}>
                  <PencilIcon />
                </Button>
              }
            />
          </>
        }
      </div>
    ),
  },
];
