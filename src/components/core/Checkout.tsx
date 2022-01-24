import React, { useState, useEffect } from "react";
import { ProductInCart } from "../../interfaces";

interface CheckoutProps {
  products: Array<ProductInCart>;
}

const Checkout = ({ products }: CheckoutProps) => {
  const getTotal = (): number =>
    products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
    </div>
  );
};

export default Checkout;
