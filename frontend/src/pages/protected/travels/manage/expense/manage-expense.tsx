import { CustomLoader } from "@/components/common/custol-loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchTravelExpenses } from "@/hooks/travel/expense/use-fetch-travel-expenses";
import { useTravel } from "@/hooks/travel/use-travel";
import { useState } from "react";
import { useParams } from "react-router";
import DataTable from "@/components/common/data-table";
import { travelExpenseColumns } from "../../expenses/travel-expense-columns";
import { Label } from "@/components/ui/label";
import type { ITravelExpense } from "@/lib/types/travel";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { TravelExpenseStatusFormDialog } from "@/components/travels/expenses/travel-expense-update-status-form";

const extraColumns: ColumnDef<ITravelExpense>[] = [
  {
    header: "Added by",
    accessorKey: "addedBy",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5 text-xs">
        <div
          className="text-xs overflow-hidden text-ellipsis max-w-40 text-muted-foreground"
          title={row.original.createdBy.name}
        >
          Name:{" "}
          <span className="text-foreground font-medium">
            {row.original.createdBy.name}
          </span>
        </div>
        <div
          className="text-xs overflow-hidden text-ellipsis max-w-40 text-muted-foreground"
          title={row.original.createdBy.email}
        >
          Email:{" "}
          <span className="text-foreground font-medium">
            {row.original.createdBy.email}
          </span>
        </div>
      </div>
    ),
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <TravelExpenseStatusFormDialog
          travelExpense={row.original}
          isApproved
          trigger={
            <Button variant={"default"} size={"xs"}>
              Approve
            </Button>
          }
        />
        <TravelExpenseStatusFormDialog
          travelExpense={row.original}
          trigger={
            <Button variant={"destructive"} size={"xs"}>
              Reject
            </Button>
          }
        />
      </div>
    ),
  },
];

export const ManageExpense = () => {
  const { travelId } = useParams();
  const [selectedUser, setSelectedUser] = useState("0");
  const { createdTravels, isCreatedTravelsLoading } = useTravel();
  const { expenses, isPending } = useFetchTravelExpenses(travelId);
  const singleTravel = createdTravels.find(({ id }) => Number(travelId) === id);
  const expenseData =
    selectedUser === "0"
      ? expenses
      : expenses?.filter(
          ({ createdBy }) => createdBy.id === Number(selectedUser),
        );

  if (isCreatedTravelsLoading || isPending) return <CustomLoader />;

  return (
    <div>
      <div className="flex flex-col gap-2 my-2">
        <Label>Select User</Label>
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={"Select User"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={"0"}>All</SelectItem>
              {singleTravel?.travelMembers.map((option) => (
                <SelectItem key={option.id} value={option.id.toString()}>
                  {option.name} - {option.email}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <DataTable
        columns={[...travelExpenseColumns, ...extraColumns]}
        data={expenseData || []}
        isLoading={isPending}
        filterColumns={["isApproved", "expenseCategory.name"]}
      />
    </div>
  );
};
