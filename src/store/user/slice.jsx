import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    first_name: "",
    last_name: "",
    email: "",
    terms: false,
    created_at: "",
    updated_at: "",
    id: "",
    token: localStorage.getItem("token"),
  },
  reducers: {
    toLogin: (state, { payload }) => {
      state.email = payload.email;
      state.password = payload.password;
    },
    setToken: (state, { payload }) => {
      state.token = payload.token;
    },
    toRegister: (state, { payload }) => {
      state.first_name = payload.first_name;
      state.last_name = payload.last_name;
      state.email = payload.email;
      state.password = payload.password;
      state.password_confirmation = payload.password_confirmation;
      state.terms = payload.terms;
    },
    logout: () => {},
    setUser: (state, { payload }) => {
      state.first_name = payload.user.first_name;
      state.last_name = payload.user.last_name;
      state.email = payload.user.email;
      state.id = payload.user.id;
      state.created_at = payload.user.created_at;
      state.updated_at = payload.user.updated_at;
      state.token = payload.authorisation.token;
    },
    setOnlyUser: (state, { payload }) => {
      state.first_name = payload.user.first_name;
      state.last_name = payload.user.last_name;
      state.email = payload.user.email;
      state.id = payload.user.id;
      state.created_at = payload.user.created_at;
      state.updated_at = payload.user.updated_at;
    },
  },
});

export const { toLogin, logout, setToken, toRegister, setUser, setOnlyUser } =
  userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
