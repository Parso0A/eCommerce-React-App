import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, ICreateCategory } from "../global/models/category/category";
import { IRootState } from "../global/models/common/store";
import { apiRequest } from "./api";

const slice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    categoryCreated: (state: any, action: PayloadAction<Category>) => {
      state.list.push(action.payload);
    },
    categoriesRequested: (state: any, action) => {
      state.loading = true;
    },
    categoriesRequestFailed: (state: any, action) => {
      state.loading = false;
    },
    categoriesReceived: (
      state: any,
      action: PayloadAction<Array<Category>>
    ) => {
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

//Selectors

export const selectCategories = createSelector(
  (state: IRootState) => state.entities.categories.list,
  (categories: Array<Category>) => categories
);

//Action Creators

export const createCategory = (category: ICreateCategory, userId: string) =>
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
