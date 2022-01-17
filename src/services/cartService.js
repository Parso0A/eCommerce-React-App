export const addItem = (item, next) => {
  let cart = [];

  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.push({ ...item, count: 1 });
    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      return cart.find((p) => p._id === id);
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    next();
  }
};

export const totalCartQuantity = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }

  return 0;
};

export const getCartItems = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }

  return [];
};

export const updateItemInCart = (productId, quantity) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((item, idx) => {
      if (item._id === productId) {
        cart[idx].count = quantity;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeItemFromCart = (productId) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      const updatedCart = cart.filter((item) => item._id !== productId);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  }
};
