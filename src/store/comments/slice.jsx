import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: null,
  },
  reducers: {
    getAll: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { getAll } = commentsSlice.actions;

export default commentsSlice.reducer; // reducer

export const selectAllComments = (state) => state.comments.comments;

export const selectCommentById = (state, cId) =>
  state.comments.find((comment) => comment.id === cId);
