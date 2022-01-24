import { DbObject } from "../common/common";

export interface Category extends DbObject {
  name: string;
}

export interface ICreateCategory {
  name: string;
}
