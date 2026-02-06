import type { IUserProfileType } from "@/lib/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isAuthenticated: boolean;
  userProfile: IUserProfileType | null;
}

const initialState = {
  isAuthenticated: false,
  userProfile: null,
} as IInitialState;

export const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.userProfile = payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
