import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user-slice",
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
