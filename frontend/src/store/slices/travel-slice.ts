import type { ITravel, ITravelExpenseCategory } from "@/lib/types/travel";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isCreatedTravelsLoading: boolean;
  isTravelsLoading: boolean;
  travels: ITravel[];
  createdTravels: ITravel[];
  travelExpenseCategories: ITravelExpenseCategory[];
}

const initialState = {
  isCreatedTravelsLoading: true,
  isTravelsLoading: true,
  travels: [],
  createdTravels: [],
  travelExpenseCategories: [],
} as IInitialState;

export const travelSlice = createSlice({
  name: "travel-slice",
  initialState,
  reducers: {
    setTravels(state, { payload }: { payload: ITravel[] }) {
      state.travels = payload;
      state.isTravelsLoading = false;
    },
    setCreatedTravels(state, { payload }: { payload: ITravel[] }) {
      state.createdTravels = payload;
      state.isCreatedTravelsLoading = false;
    },
    setTravelExpenseCategories(state, { payload }) {
      state.travelExpenseCategories = payload;
    },
  },
});

export const { setTravels, setCreatedTravels, setTravelExpenseCategories } =
  travelSlice.actions;
export const travelReducer = travelSlice.reducer;
