import { createSlice } from "@reduxjs/toolkit";

const featureSlice = createSlice({
  name: "feature",
  initialState: {
    upload: false,
    paymentGateway: false,
    sport: false,
    tournament: false,
  },
  reducers: {
    setUpload(state) {
      state.upload = !state.upload;
    },
    setSport(state) {
      state.sport = !state.sport;
    },
    setTournament(state) {
      state.tournament = !state.tournament;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setHeading(state, action) {
      state.heading = action.payload;
    },
  },
});

export const featureActions = featureSlice.actions;
export default featureSlice;
