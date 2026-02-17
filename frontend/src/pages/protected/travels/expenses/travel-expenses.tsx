import DataTable from "@/components/common/data-table";
import { CustomEmpty } from "@/components/shared/custom-empty";
import { TravelExpenseFormDialog } from "@/components/travels/expenses/travel-expense-form-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchTravelExpenses } from "@/hooks/travel/expense/use-fetch-travel-expenses";
import { useTravel } from "@/hooks/travel/use-travel";
import { emitGoBack } from "@/lib/helpers/events/go-back-event";
import { FileExclamationPoint, PencilIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { travelExpenseColumns } from "./travel-expense-columns";
import { useFetchTravelExpenseCategories } from "@/hooks/travel/expense/use-fetch-travel-expense-categories";
import { CardContentRow } from "@/components/shared/card-content-row";
import { Separator } from "@/components/ui/separator";
import type { ITravelExpense } from "@/lib/types/travel";
import type { ColumnDef } from "@tanstack/react-table";
import { DeleteTravelExpenseBtn } from "@/components/travels/expenses/delete-travel-expense-btn";
import { Button } from "@/components/ui/button";

export const TravelExpenses = ({ manage }: { manage?: boolean }) => {
  const { travelId } = useParams();

  useFetchTravelExpenseCategories();

  const { travels, createdTravels, isCreatedTravelsLoading, isTravelsLoading } =
    useTravel();

  const singleTravel = manage
    ? createdTravels?.find(({ id }) => id == Number(travelId))
    : travels?.find(({ id }) => id == Number(travelId));

  const { expenses, isPending } = useFetchTravelExpenses(
    singleTravel?.id,
    true,
  );

  useEffect(() => {
    if (!isCreatedTravelsLoading && !isTravelsLoading && !singleTravel) {
      emitGoBack("/travels");
    }
  }, [isTravelsLoading, singleTravel, isCreatedTravelsLoading]);

  if (isTravelsLoading || isCreatedTravelsLoading) return;

  const uniqueDates = Array.from(
    new Set(
      expenses?.map((expense) =>
        new Date(expense.expenseDate).toLocaleDateString(),
      ),
    ),
  );

  const groupedExpenses = uniqueDates?.map((groupDate) => {
    const filteredExpenses = expenses?.filter(
      ({ expenseDate }) =>
        new Date(expenseDate).toLocaleDateString() == groupDate,
    );
    return {
      date: groupDate,
      totalAmount: filteredExpenses?.reduce(
        (acc, { amount }) => acc + amount,
        0,
      ),
      totalApprovedAmount: filteredExpenses?.reduce(
        (acc, { amount, isApproved }) => acc + (isApproved ? amount : 0),
        0,
      ),
      expenses: filteredExpenses,
    };
  });

  return (
    <div className="flex flex-col gap-2">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Travel :{singleTravel?.title}</CardTitle>
          <CardDescription>{singleTravel?.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <CardContentRow
            label="Approved Expense"
            value={groupedExpenses?.reduce(
              (acc, { totalApprovedAmount }) =>
                acc + (totalApprovedAmount || 0),
              0,
            )}
          />
          <Separator />
          <CardContentRow
            label="Total Expense"
            value={groupedExpenses?.reduce(
              (acc, { totalAmount }) => acc + (totalAmount || 0),
              0,
            )}
          />
        </CardContent>
      </Card>
      <div className="flex items-center justify-between gap-3 w-full mt-4">
        <div className="text-xl font-medium">Travel Expenses</div>
        <TravelExpenseFormDialog />
      </div>
      {isPending &&
        [1, 2, 3, 4].map((ele) => (
          <Skeleton className="h-10 w-full" key={ele} />
        ))}

      {!isPending && expenses?.length === 0 && (
        <CustomEmpty
          title="No expenses"
          description="There are no expenses available here"
          Icon={FileExclamationPoint}
        />
      )}

      {!isPending && (
        <Accordion type="single" collapsible className="w-full">
          {groupedExpenses?.map((group) => (
            <AccordionItem
              key={group.date}
              value={group.date}
              className="bg-secondary dark:bg-secondary/50 p-1 px-4 rounded-md border! border-transparent hover:border-primary/30 data-[state=open]:border-primary/50 mb-2 cursor-pointer!"
            >
              <AccordionTrigger>
                <div className="text-muted-foreground">
                  Date:{" "}
                  <span className="font-medium text-foreground">
                    {group.date}
                  </span>
                </div>
                <div className="text-muted-foreground">
                  Total Amount:{" "}
                  <span className="font-medium text-foreground">
                    {group.totalAmount}
                  </span>
                </div>
                <div className="text-muted-foreground">
                  Approved Amount:{" "}
                  <span className="font-medium text-primary">
                    {group.totalApprovedAmount}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <DataTable
                  columns={[...travelExpenseColumns, ...extraColumns]}
                  data={group.expenses || []}
                  isLoading={isPending}
                  filterColumns={[
                    "description",
                    "isApproved",
                    "expenseCategory.name",
                  ]}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

const extraColumns: ColumnDef<ITravelExpense>[] = [
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
