import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    token: "",
  },
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearUser(state) {
      state.user = {};
      state.token = "";
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
