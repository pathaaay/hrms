import type { IUserProfile, ROLE } from "@/lib/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isAuthenticated: boolean;
  userProfile: IUserProfile | null;
  userRole: ROLE | null;
  interestedGameIds: Array<number>;
}

const initialState = {
  isAuthenticated: false,
  userProfile: null,
  userRole: null,
  interestedGameIds: [],
} as IInitialState;

export const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    setUser(state, { payload }: { payload: IUserProfile }) {
      state.isAuthenticated = true;
      state.userProfile = payload;
      state.userRole = payload.role;
      state.interestedGameIds = payload?.interestedGames?.map(({ id }) => id);
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
