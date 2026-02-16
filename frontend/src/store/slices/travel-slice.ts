import type { ITravel } from "@/lib/types/travel";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isCreatedTravelsLoading: boolean;
  isTravelsLoading: boolean;
  travels: ITravel[] | [];
  createdTravels: ITravel[] | [];
}

const initialState = {
  isCreatedTravelsLoading: true,
  isTravelsLoading: true,
  travels: [],
  createdTravels: [],
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
  },
});

export const { setTravels, setCreatedTravels } = travelSlice.actions;
export const travelReducer = travelSlice.reducer;
