import { configureStore } from "@reduxjs/toolkit";
import galleriesReducer from "./galleries/slice";
import userReducer from "./user/slice";
import commentsReducer from "./comments/slice";

export default configureStore({
  reducer: {
    galleries: galleriesReducer,
    user: userReducer,
    comments: commentsReducer,
  },
});
