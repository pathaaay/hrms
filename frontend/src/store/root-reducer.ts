import { combineReducers } from "@reduxjs/toolkit";
import { gameReducer } from "./slices/game-slice";
import { jobReducer } from "./slices/job-slice";
import { userReducer } from "./slices/user-slice";
import { travelReducer } from "./slices/travel-slice";

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  job: jobReducer,
  travel: travelReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
