import { createSlice } from "@reduxjs/toolkit";

export const gallerySlice = createSlice({
  name: "galleries",
  initialState: {
    galleries: null,
    searchTerm: "",
  },
  reducers: {
    getAll: (state, action) => {
      state.galleries = action.payload;
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
  },
});

export const { getAll, setSearchTerm } = gallerySlice.actions;

export default gallerySlice.reducer; // reducer

export const selectAllGalleries = (state) => state.galleries.galleries;

export const selectGalleryById = (state, gId) =>
  state.galleries.find((gallery) => gallery.id === gId);
