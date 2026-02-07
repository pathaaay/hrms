import type { IGame } from "@/lib/types/game";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isLoading: boolean;
  games: Array<IGame> | [];
}

const initialState = {
  isLoading: false,
  games: [],
} as IInitialState;

export const userSlice = createSlice({
  name: "game-slice",   
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.isLoading = true;
      state.games = payload;
    },
  },
});


export const { setUser } = userSlice.actions;
export default userSlice.reducer;
