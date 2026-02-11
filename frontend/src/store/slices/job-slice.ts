import type { IJob } from "@/lib/types/job";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isLoading: boolean;
  jobs: Array<IJob> | [];
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
      state.jobs = payload;
      state.isLoading = false;
    },
  },
});

export const { setJobs } = jobSlice.actions;
export const jobReducer = jobSlice.reducer;
