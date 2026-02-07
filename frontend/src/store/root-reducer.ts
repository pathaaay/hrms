import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import gameReducer from "./slices/user-slice";

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
