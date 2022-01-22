import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { apiRequest, apiRequestFail } from "./api";
import queryString from "query-string";

const slice = createSlice({
  name: "products",
  initialState: {
    bySale: [],
    byArrival: [],
    filteredProducts: {
      data: [],
      currentFilter: {
        category: [],
        price: [],
      },
      totalCount: 0,
      shouldReload: false,
    },
    list: [],
  },
  reducers: {
    productsBySale: (state, action) => {
      state.bySale = action.payload;
    },
    productsByArrival: (state, action) => {
      state.byArrival = action.payload;
    },
    productsFiltered: (state, action) => {
      if (state.filteredProducts.shouldReload) {
        state.filteredProducts.data = action.payload.data;
      } else {
        state.filteredProducts.data.push(...action.payload.data);
      }
      state.filteredProducts.shouldReload = false;
      state.filteredProducts.totalCount = action.payload.totalCount;
    },
    productsReceived: (state, action) => {
      state.list = action.payload;
    },
    productCreated: (state, action) => {
      state.list.push(action.payload);
    },
    filtersSet: (state, action) => {
      state.filteredProducts.currentFilter = { ...action.payload.filters };
      state.filteredProducts.shouldReload = true;
    },
  },
});

const {
  productsBySale,
  productsByArrival,
  productsFiltered,
  productsReceived,
  productCreated,
  filtersSet,
} = slice.actions;

export default slice.reducer;

export const getProductsBySale = () =>
  apiRequest({
    url: `/products?sortBy=sell&order=desc&limit=6`,
    method: "GET",
    onSuccess: productsBySale.type,
  });

export const selectProductsBySale = createSelector(
  (state) => state.entities.products.bySale,
  (products) => products
);

export const selectTotalCount = createSelector(
  (state) => state.entities.products.filteredProducts.totalCount,
  (totalCount) => totalCount
);

export const selectProductsByArrival = createSelector(
  (state) => state.entities.products.byArrival,
  (products) => products
);

export const selectFilteredProducts = createSelector(
  (state) => state.entities.products.filteredProducts.data,
  (products) => products
);

export const selectMainPageProducts = createSelector(
  (state) => state.entities.products.list,
  (products) => products
);

export const getProductsByArrival = () =>
  apiRequest({
    url: `/products?sortBy=createdAt&order=desc&limit=6`,
    method: "GET",
    onSuccess: productsByArrival.type,
  });

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    skip,
    limit,
    filters,
  };

  return apiRequest({
    url: "/products/by/search",
    method: "POST",
    data,
    onSuccess: productsFiltered.type,
  });
};

export const getMainPageProducts = (params) => {
  const query = queryString.stringify(params);

  return apiRequest({
    url: `/products/search?${query}`,
    method: "GET",
    onSuccess: productsReceived.type,
  });
};

export const createProduct = (product, userId) =>
  apiRequest({
    url: `/product/create/${userId}`,
    method: "POST",
    data: product,
    onSuccess: productCreated.type,
  });

export const setFilter = createAction(filtersSet.type, (filters) => ({
  payload: filters,
}));
