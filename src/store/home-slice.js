import { createSlice } from "@reduxjs/toolkit";

const homeInitialState = {
  url: {},
  genres: {},
};
const homeSlice = createSlice({
  name: "home",
  initialState: homeInitialState,
  reducers: {
    getApiConfiguration(state, action) {
      state.url = action.payload;
    },
    getGenres(state, action) {},
  },
});

const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
