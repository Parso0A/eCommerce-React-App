import { Category } from "../category/category";
import { DbObject } from "../common/common";

export interface Product extends DbObject {
  photo: object;
  sold: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  quantity: number;
  shipping: boolean;
  error?: string;
}

export interface ProductInCart extends Product {
  count: number;
}

export interface FilterProductsPayload {
  data: Array<Product>;
  totalCount: number;
}
