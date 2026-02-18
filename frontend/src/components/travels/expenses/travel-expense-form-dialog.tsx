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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDocumentMutation } from "@/api/mutations/document";
import { WalletIcon } from "lucide-react";
import { cn, createMultiSelectOption } from "@/lib/utils";

import { queryClient } from "@/lib/tanstack-query/query-client";
import {
  TravelExpenseSchema,
  type TravelExpenseSchemaType,
} from "@/lib/schemas/travel/travel-expense-schema";
import { useTravel } from "@/hooks/travel/use-travel";
import {
  useCreateTravelExpenseMutation,
  useUpdateTravelExpenseMutation,
} from "@/api/mutations/travel/travel-expense";
import { useParams } from "react-router";
import type { ITravelExpense } from "@/lib/types/travel";

const formFields: ICustomFormField<TravelExpenseSchemaType> = [
  {
    label: "Amount",
    key: "amount",
    placeholder: "Enter amount",
    type: "number",
  },
  {
    label: "Description",
    key: "description",
    placeholder: "Enter description",
  },
  {
    label: "Expense Date",
    key: "expenseDate",
    type: "date",
    placeholder: "Select date",
    disable: (date) => date > new Date(),
  },
];

export const TravelExpenseFormDialog = ({
  trigger,
  travelExpense,
}: {
  trigger?: React.ReactNode;
  travelExpense?: ITravelExpense;
}) => {
  const { travelId } = useParams();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const { mutateAsync: createTravelExpense, isPending } =
    useCreateTravelExpenseMutation();
  const { mutateAsync: updateTravelExpense, isPending: isUpdating } =
    useUpdateTravelExpenseMutation();
  const { mutateAsync: handlFileUpload, isPending: isFileUploading } =
    useDocumentMutation();
  const { travelExpenseCategories } = useTravel();

  const form = useForm({
    resolver: zodResolver(TravelExpenseSchema),
    defaultValues: {
      travelId: Number(travelId),
      travelExpenseId: travelExpense?.id || undefined,
      amount: travelExpense?.amount || 0,
      description: travelExpense?.description || "",
      expenseCategoryId: travelExpense?.expenseCategory?.id.toString() || "",
      expenseDate: travelExpense?.expenseDate
        ? new Date(travelExpense?.expenseDate)
        : new Date(),
    },
  });

  const onFormSubmit = async (values: TravelExpenseSchemaType) => {
    if (!travelExpense && (!files || files?.length < 0)) {
      setFileError("CV file is required");
      return;
    }

    let data;
    if (files && files?.length > 0) data = await handlFileUpload(files);

    const newValue = {
      ...values,
      proofDocumentId: data?.id || travelExpense?.expenseProofDocument?.id,
    };

    if (travelExpense) await updateTravelExpense(newValue);
    else await createTravelExpense(newValue);

    queryClient.invalidateQueries({
      queryKey: [`travel-expenses-${travelId}`],
    });

    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <WalletIcon />
            {travelExpense ? "Update" : "Add"} Expense
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{travelExpense ? "Update" : "Add"} expense</DialogTitle>
          <DialogDescription hidden></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onFormSubmit)}
          className="flex flex-col gap-2"
        >
          <ScrollArea className="max-h-[80vh] pr-1">
            <FieldGroup className="flex items-center flex-col gap-3 px-1.5">
              <CustomFormFields<TravelExpenseSchemaType>
                fieldClass="gap-1"
                control={form.control}
                formFields={[
                  {
                    label: "Expense Category",
                    key: "expenseCategoryId",
                    type: "select",
                    placeholder: "Select category",
                    options: travelExpenseCategories.map((category) =>
                      createMultiSelectOption(
                        category.id.toString(),
                        category.name,
                      ),
                    ),
                  },
                  ...formFields,
                ]}
              />
              <Field className={cn(`gap-1`, fileError && "text-destructive")}>
                <FieldLabel htmlFor="picture">Proof document</FieldLabel>
                <Input
                  onChange={(e) => {
                    setFileError("");
                    setFiles(e.target.files);
                  }}
                  className={cn(fileError && "text-destructive")}
                  id="picture"
                  type="file"
                />
                {fileError && <FieldError>{fileError}</FieldError>}
              </Field>
            </FieldGroup>
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size={"sm"}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={
                isFileUploading ||
                isPending ||
                isUpdating ||
                (!form.formState.isDirty && !files)
              }
              size={"sm"}
            >
              {isFileUploading || isPending || isUpdating
                ? "Please wait..."
                : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
