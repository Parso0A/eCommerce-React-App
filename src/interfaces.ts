export interface Auth {
  email: string;
  password: string;
}

interface DbObject {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User extends DbObject {
  email: string;
  name: string;
  role: number;
}

export interface AuthenticationContext {
  token: string;
  user: User;
}

export interface Product extends DbObject {
  photo: object;
  sold: number;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  shipping: boolean;
}

export interface ProductInCart extends Product {
  count: number;
}

export interface PriceFilterItem {
  _id: number;
  name: string;
  array: Array<number>;
}

export interface Category extends DbObject {
  name: string;
}

export interface ApiRequestPayload {
  url: string;
  method: string;
  data?: object;
  onSuccess: string;
  onError?: string;
  onStart?: string;
}

export interface FilterProductsPayload {
  data: Array<Product>;
  totalCount: number;
}

export interface ICreateProduct {
  photo: any;
  name: string;
  category: string;
  shipping: boolean;
  description: string;
  price: number;
  quantity: number;
}
