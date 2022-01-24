import {
  createAction,
  createSelector,
  createSlice,
  PayloadAction,
  Selector,
} from "@reduxjs/toolkit";
import { apiRequest, apiRequestFail } from "./api";
import queryString from "query-string";
import { FilterProductsPayload, IRootState, Product } from "../interfaces";

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
    productsBySale: (state: any, action: PayloadAction<Array<Product>>) => {
      state.bySale = action.payload;
    },
    productsByArrival: (state: any, action: PayloadAction<Array<Product>>) => {
      state.byArrival = action.payload;
    },
    productsFiltered: (
      state: any,
      action: PayloadAction<FilterProductsPayload>
    ) => {
      if (state.filteredProducts.shouldReload) {
        state.filteredProducts.data = action.payload.data;
      } else {
        state.filteredProducts.data.push(...action.payload.data);
      }
      state.filteredProducts.shouldReload = false;
      state.filteredProducts.totalCount = action.payload.totalCount;
    },
    productsReceived: (state: any, action: PayloadAction<Array<Product>>) => {
      state.list = action.payload;
    },
    productCreated: (state: any, action: PayloadAction<Product>) => {
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

export const selectProductsBySale = createSelector(
  (state: IRootState) => state.entities.products.bySale,
  (products: Array<Product>) => products
);

export const selectTotalCount = createSelector(
  (state: IRootState) => state.entities.products.filteredProducts.totalCount,
  (totalCount: number) => totalCount
);

export const selectProductsByArrival = createSelector(
  (state: IRootState) => state.entities.products.byArrival,
  (products: Array<Product>) => products
);

export const selectFilteredProducts = createSelector(
  (state: IRootState) => state.entities.products.filteredProducts.data,
  (products: Array<Product>) => products
);

export const selectMainPageProducts = createSelector(
  (state: IRootState) => state.entities.products.list,
  (products: Array<Product>) => products
);

export const getProductsByArrival = () =>
  apiRequest({
    url: `/products?sortBy=createdAt&order=desc&limit=6`,
    method: "GET",
    onSuccess: productsByArrival.type,
  });

export const getFilteredProducts = (
  skip: number,
  limit: number,
  filters = {}
) => {
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

export const getMainPageProducts = (params: any) => {
  const query = queryString.stringify(params);

  return apiRequest({
    url: `/products/search?${query}`,
    method: "GET",
    onSuccess: productsReceived.type,
  });
};

export const createProduct = (product: FormData, userId: string) =>
  apiRequest({
    url: `/product/create/${userId}`,
    method: "POST",
    data: product,
    onSuccess: productCreated.type,
  });

export const getProductsBySale = () =>
  apiRequest({
    url: `/products?sortBy=sell&order=desc&limit=6`,
    method: "GET",
    onSuccess: productsBySale.type,
  });

export const setFilter = createAction(filtersSet.type, (filters) => ({
  payload: filters,
}));
