import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "../../services/product/productService";
import Card from "./Card";

const Checkout = ({ products }) => {
  const getTotal = () =>
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
