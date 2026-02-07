import type { IGame } from "@/lib/types/game";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isLoading: boolean;
  games: Array<IGame> | [];
}

const initialState = {
  isLoading: true,
  games: [],
} as IInitialState;

export const gameSlice = createSlice({
  name: "game-slice",
  initialState,
  reducers: {
    setGames(state, { payload }) {
      console.log("setting games", payload);
      state.isLoading = false;
      state.games = payload;
    },
  },
});

export const { setGames } = gameSlice.actions;
export default gameSlice.reducer;
