import type { IJob } from "@/lib/types/job";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isLoading: boolean;
  jobs: Array<IJob> | [];
  activeJobs: Array<IJob> | [];
}

const initialState = {
  isLoading: true,
  jobs: [],
  activeJobs: [],
} as IInitialState;

export const jobSlice = createSlice({
  name: "job-slice",
  initialState,
  reducers: {
    setJobs(state, { payload }: { payload: IJob[] }) {
      state.jobs = payload;
      state.isLoading = false;
      state.activeJobs = payload.filter(({ isActive }) => isActive);
    },
  },
});

export const { setJobs } = jobSlice.actions;
export const jobReducer = jobSlice.reducer;
