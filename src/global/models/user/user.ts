import { DbObject } from "../common/common";

export interface Auth {
  email: string;
  password: string;
}

export interface IRegister extends Auth {
  name: string;
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
