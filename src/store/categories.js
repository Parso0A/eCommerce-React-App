import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "./api";

const slice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    categoryCreated: (state, action) => {
      state.list.push(action.payload);
    },
    categoriesRequested: (state, action) => {
      state.loading = true;
    },
    categoriesRequestFailed: (state, action) => {
      state.loading = false;
    },
    categoriesReceived: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
  },
});

const {
  categoryCreated,
  categoriesRequested,
  categoriesRequestFailed,
  categoriesReceived,
} = slice.actions;

export default slice.reducer;

export const selectCategories = createSelector(
  (state) => state.entities.categories.list,
  (categories) => categories
);

export const createCategory = (category, userId) =>
  apiRequest({
    url: `/category/create/${userId}`,
    method: "POST",
    data: category,
    onSuccess: categoryCreated.type,
    onError: categoriesRequestFailed.type,
  });

export const getCategories = () =>
  apiRequest({
    url: "/categories",
    method: "GET",
    onSuccess: categoriesReceived.type,
    onStart: categoriesRequested.type,
    onError: categoriesRequestFailed.type,
  });
