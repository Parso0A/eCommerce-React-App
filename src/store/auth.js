import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";

const slice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    user: {},
  },
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    userLoggedOut: (state, action) => {
      state.token = "";
      state.user = {};
    },
  },
});

export default slice.reducer;

const { userLoggedIn, userLoggedOut } = slice.actions;

export const selectToken = createSelector(
  (state) => state.auth,
  (user) => user.token
);

export const selectUser = createSelector(
  (state) => state.auth.user,
  (user) => user
);

export const signIn = (user) =>
  apiRequest({
    url: "/signin",
    method: "POST",
    data: user,
    onSuccess: userLoggedIn.type,
  });

export const signOut = () =>
  apiRequest({
    url: "/signout",
    method: "GET",
    onSuccess: userLoggedOut.type,
  });
