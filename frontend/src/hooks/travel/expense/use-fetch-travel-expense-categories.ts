import { getAllExpenseCategories } from "@/api/actions/travels/travel-expense";
import type { ITravelExpenseCategory } from "@/lib/types/travel";
import { setTravelExpenseCategories } from "@/store/slices/travel-slice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchTravelExpenseCategories = () => {
  const dispatch = useDispatch();

  const { data: expenses, isPending } = useQuery<ITravelExpenseCategory[]>({
    queryKey: [`travel-expenses-categories`],
    queryFn: () => getAllExpenseCategories(),
  });

  useEffect(() => {
    if (!isPending && expenses?.length)
      dispatch(setTravelExpenseCategories(expenses));
  }, [isPending]);
};
