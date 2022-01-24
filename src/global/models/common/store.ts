import { Category } from "../category/category";
import { Product } from "../product/product";

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
