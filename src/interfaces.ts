export interface Auth {
  email: string;
  password: string;
}

export interface IRegister extends Auth {
  name: string;
}

export interface DbObject {
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
  error?: string;
}

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

export interface ICreateCategory {
  name: string;
}

interface IProductsRootState {
  bySale: Array<Product>;
  byArrival: Array<Product>;
  filteredProducts: IFilteredProductsState;
  list: Array<Product>;
}

interface IFilteredProductsState {
  data: Array<Product>;
  currentFilter: ICurrentProductsFilter;
  totalCount: number;
  shouldReload: boolean;
}

interface ICurrentProductsFilter {
  category: Array<string>;
  price: [number, number] | [];
}

interface ICategoriesRootState {
  list: Array<Category>;
  loading: boolean;
}

interface IEntitiesRootState {
  products: IProductsRootState;
  categories: ICategoriesRootState;
}

export interface IRootState {
  entities: IEntitiesRootState;
}
