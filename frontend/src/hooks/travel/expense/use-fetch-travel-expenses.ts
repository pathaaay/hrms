import { getAllExpensesByTravelId } from "@/api/actions/travels/travel-expense";
import type { ITravelExpense } from "@/lib/types/travel";
import { useQuery } from "@tanstack/react-query";

interface ReturnType {
  isPending: boolean;
  expenses: ITravelExpense[] | undefined;
}

export const useFetchTravelExpenses = (
  travelId: string = "",
): ReturnType => {
  const { data: expenses, isPending } = useQuery<ITravelExpense[]>({
    queryKey: [`travel-expenses-${travelId}`],
    queryFn: () => getAllExpensesByTravelId(travelId),
  });

  return { expenses, isPending };
};
