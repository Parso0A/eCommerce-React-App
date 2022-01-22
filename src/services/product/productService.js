import { API } from "../../config";
import queryString from "query-string";

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
