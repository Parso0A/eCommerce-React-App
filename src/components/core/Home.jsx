import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "../../services/product/productService";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsbySale, setProductsBySale] = useState([]);

  const [productsByArrival, setProductsByArrival] = useState([]);

  const [error, setError] = useState(false);

  const loadProductsBySale = () => {
    getProducts("sell").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySale(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsBySale();
    loadProductsByArrival();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="E-Commerce"
      className={"container-fluid"}
    >
      <Search />
      <h2 className="mb-4 text-center">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((item, idx) => (
          <Card key={item._id} product={item}></Card>
        ))}
      </div>

      <h2 className="mb-4 text-center">Best Sellers</h2>
      <div className="row">
        {productsbySale.map((item, idx) => (
          <Card key={item._id} product={item}></Card>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
