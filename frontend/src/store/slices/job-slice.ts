import type { IGame } from "@/lib/types/game";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isLoading: boolean;
  jobs: Array<IGame> | [];
}

const initialState = {
  isLoading: true,
  jobs: [],
} as IInitialState;

export const jobSlice = createSlice({
  name: "job-slice",
  initialState,
  reducers: {
    setJobs(state, { payload }) {
      state.isLoading = false;
      state.jobs = payload;
    },
  },
});

export const { setJobs } = jobSlice.actions;
export const jobReducer = jobSlice.reducer;
