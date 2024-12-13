import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    theme: "dark",
    heading: "",
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setHeading(state, action) {
      state.heading = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
