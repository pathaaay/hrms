import type { IUserProfile } from "@/lib/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isAuthenticated: boolean;
  userProfile: IUserProfile | null;
  interestedGameIds: Array<number>;
}

const initialState = {
  isAuthenticated: false,
  userProfile: null,
  interestedGameIds: [],
} as IInitialState;

export const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    setUser(state, { payload }: { payload: IUserProfile }) {
      state.isAuthenticated = true;
      state.userProfile = payload;
      state.interestedGameIds = payload?.interestedGames?.map(({ id }) => id);
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
