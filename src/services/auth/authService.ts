import { API } from "../../config";
import { Auth, AuthenticationContext, User } from "../../interfaces";

export const signUp = (user: Auth) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signIn = (user: Auth): Promise<User> => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const authenticate = (data: AuthenticationContext, next: Function) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
  next();
};

export const signOut = (next: Function) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }

  return fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((response) => {
      if (next) next();
    })
    .catch((err) => console.log(err));
};

export const isAuthenticated = (): AuthenticationContext | null => {
  if (typeof window == "undefined") {
    return null;
  }

  const jwt = localStorage.getItem("jwt");

  if (jwt) {
    return JSON.parse(localStorage.getItem("jwt")!);
  } else return null;
};
