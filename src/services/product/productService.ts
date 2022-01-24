import { API } from "../../config";
import { Product } from "../../global/models/product/product";

export const getProduct = (productId: string): Promise<Product> => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getRelatedProducts = (
  productId: string
): Promise<Array<Product>> => {
  return fetch(`${API}/products/related/${productId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
