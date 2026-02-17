import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CustomFormFields,
  type ICustomFormField,
} from "@/components/shared/custom-form-fields";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { WalletIcon } from "lucide-react";
import {
  TravelExpenseStatusSchema,
  type TravelExpenseStatusSchemaType,
} from "@/lib/schemas/travel/travel-expense-schema";
import { useChangeTravelExpenseStatusMutation } from "@/api/mutations/travel/travel-expense";
import { useParams } from "react-router";
import type { ITravelExpense } from "@/lib/types/travel";
import { cn } from "@/lib/utils";
import { queryClient } from "@/lib/tanstack-query/query-client";

export const TravelExpenseStatusFormDialog = ({
  trigger,
  travelExpense,
  isApproved = false,
}: {
  trigger?: React.ReactNode;
  travelExpense: ITravelExpense;
  isApproved?: boolean;
}) => {
  const { travelId } = useParams();
  const [open, setOpen] = useState(false);
  const {
    mutateAsync: changeStatus,
    isPending,
    isSuccess,
  } = useChangeTravelExpenseStatusMutation();
  const form = useForm({
    resolver: zodResolver(TravelExpenseStatusSchema),
    defaultValues: {
      isApproved,
      remarks: "",
      travelId: Number(travelId),
      travelExpenseId: travelExpense?.id,
    },
  });

  useEffect(() => {
    if (!isSuccess) return;
    setOpen(false);
    queryClient.invalidateQueries({
      queryKey: [`travel-expenses-${travelId}`],
    });
    form.reset();
  }, [isSuccess]);

  const onFormSubmit = (values: TravelExpenseStatusSchemaType) => {
    changeStatus(values);
  };

  const formFields: ICustomFormField<TravelExpenseStatusSchemaType> = [
    {
      label: "Remarks " + (isApproved && " (optional)"),
      key: "remarks",
      placeholder: "Enter Remarks",
      type: "textarea",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <WalletIcon />
            {isApproved ? "Approve" : "Reject"} Expense
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <span
              className={cn(
                `font-medium`,
                isApproved ? "text-green-500" : "text-red-500",
              )}
            >
              {isApproved ? "Approve" : "Reject"}
            </span>{" "}
            Expense
          </DialogTitle>
          <DialogDescription hidden></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onFormSubmit)}
          className="flex flex-col gap-2"
        >
          <FieldGroup className="flex items-center flex-col gap-3 px-1.5 py-2">
            <CustomFormFields<TravelExpenseStatusSchemaType>
              fieldClass="gap-1"
              control={form.control}
              formFields={formFields}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size={"sm"}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => console.log(form)}
              disabled={isPending}
              size={"sm"}
            >
              {isPending ? "Please wait..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
