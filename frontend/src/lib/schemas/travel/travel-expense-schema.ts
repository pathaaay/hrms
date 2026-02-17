import z from "zod";

export const TravelExpenseSchema = z.object({
  travelId: z.number(),
  amount: z
    .number()
    .min(1, { error: "Amount is required" })
    .nonnegative({ error: "Amount must be positive" }),
  description: z.string(),
  travelExpenseId: z.number().optional(),
  expenseDate: z.date().nonoptional({ error: "Expense date is required" }),
  expenseCategoryId: z
    .string()
    .nonempty({ error: "Expense category is required" }),
});

export type TravelExpenseSchemaType = z.infer<typeof TravelExpenseSchema>;
