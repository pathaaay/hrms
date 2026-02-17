import { apiService } from "@/lib/axios";
import type {
  TravelExpenseSchemaType,
  TravelExpenseStatusSchemaType,
} from "@/lib/schemas/travel/travel-expense-schema";

const TRAVEL_EXPENSE_ENDPOINT = "/travels/expenses";

export const getAllExpensesOfUserByTravelId = async (
  travelId: string | number,
) => {
  if (!travelId) return false;
  const res = await apiService.get(
    `${TRAVEL_EXPENSE_ENDPOINT}/${travelId}/user`,
  );
  return res.data;
};

export const getAllExpensesByTravelId = async (travelId: string | number) => {
  if (!travelId) return false;
  const res = await apiService.get(`${TRAVEL_EXPENSE_ENDPOINT}/${travelId}`);
  return res.data;
};

export const getAllExpenseCategories = async () => {
  const res = await apiService.get(`${TRAVEL_EXPENSE_ENDPOINT}/categories`);
  return res.data;
};

export const createTravelExpense = async (values: TravelExpenseSchemaType) => {
  const res = await apiService.post(
    `${TRAVEL_EXPENSE_ENDPOINT}/${values.travelId}`,
    {
      ...values,
    },
  );
  return res.data;
};

export const updateTravelExpense = async (values: TravelExpenseSchemaType) => {
  const res = await apiService.put(
    `${TRAVEL_EXPENSE_ENDPOINT}/${values.travelId}/${values.travelExpenseId}`,
    {
      ...values,
    },
  );
  return res.data;
};

export const deleteTravelExpense = async ({
  travelExpenseId,
  travelId,
}: {
  travelId: number;
  travelExpenseId: number;
}) => {
  const res = await apiService.delete(
    `${TRAVEL_EXPENSE_ENDPOINT}/${travelId}/${travelExpenseId}`,
  );
  return res.data;
};

export const changeTravelExpenseStatus = async (
  values: TravelExpenseStatusSchemaType,
) => {
  const res = await apiService.patch(
    `${TRAVEL_EXPENSE_ENDPOINT}/${values.travelId}/${values.travelExpenseId}/update-status`,
    {
      ...values,
    },
  );
  return res.data;
};
