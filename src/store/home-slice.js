import { createSlice } from "@reduxjs/toolkit";

const homeInitialState = {
  url: {},
  genres: {},
  isModalShow: false,
};
const homeSlice = createSlice({
  name: "home",
  initialState: homeInitialState,
  reducers: {
    getApiConfiguration(state, action) {
      state.url = action.payload;
    },
    getGenres(state, action) {
      state.genres = action.payload;
    },
  },
});

export const { getApiConfiguration, getGenres, showVideoModal } = homeSlice.actions;

export default homeSlice.reducer;
