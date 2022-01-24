import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import {
  selectProductsBySale,
  getProductsBySale,
  selectProductsByArrival,
  getProductsByArrival,
} from "../../store/products";

const Home = () => {
  const dispatch = useDispatch();

  const productsBySale = useSelector(selectProductsBySale);
  const productsByArrival = useSelector(selectProductsByArrival);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getProductsBySale());
    dispatch(getProductsByArrival());
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
          <div key={item._id} className="col-4 mb-3">
            <Card product={item}></Card>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-center">Best Sellers</h2>
      <div className="row">
        {productsBySale.map((item, idx) => (
          <div key={item._id} className="col-4 mb-3">
            <Card product={item}></Card>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
