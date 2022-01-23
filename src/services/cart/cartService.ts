import { Product, ProductInCart } from "../../interfaces";

export const addItem = (item: Product, next: Function) => {
  let cart: Array<ProductInCart> = [];

  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart")!)!;
    }

    cart.push({ ...item, count: 1 });
    cart = Array.from(new Set(cart.map((p) => p._id)))!.map((id) => {
      return cart.find((p) => p._id === id)!;
    })!;

    localStorage.setItem("cart", JSON.stringify(cart));

    next();
  }
};

export const totalCartQuantity = (): number => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")!)!.length;
    }
  }

  return 0;
};

export const getCartItems = (): Array<ProductInCart> => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")!);
    }
  }

  return [];
};

export const updateItemInCart = (productId: string, quantity: number) => {
  let cart: Array<ProductInCart> = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart")!);
    }

    cart.map((item, idx) => {
      if (item._id === productId) {
        cart[idx].count = quantity;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeItemFromCart = (productId: string) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      const cart: Array<ProductInCart> = JSON.parse(
        localStorage.getItem("cart")!
      );

      const updatedCart = cart.filter((item) => item._id !== productId);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  }
};
