import { API } from "../../config";
import queryString from "query-string";

export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy${sortBy}&order=desc&limit=6`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };

  return fetch(`${API}/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getMainPageProducts = (params) => {
  const query = queryString.stringify(params);

  return fetch(`${API}/products/search?${query}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getRelatedProducts = (productId) => {
  return fetch(`${API}/products/related/${productId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
