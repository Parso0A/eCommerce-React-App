import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import CheckBox from "./CheckBox";
import { prices } from "../../services/common/fixedPrices";
import RadioBox from "./RadioBox";
import {
  getFilteredProducts,
  selectFilteredProducts,
  setFilter,
  selectTotalCount,
} from "../../store/products";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories, getCategories } from "../../store/categories";

const Shop = () => {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);

  const products = useSelector(selectFilteredProducts);

  const totalCount = useSelector(selectTotalCount);

  const [limit, setLimit] = useState(3);

  const [skip, setSkip] = useState(0);

  const [categoryFilters, setCategoryFilters] = useState({
    filters: {
      category: [],
      price: [],
    },
  });

  const [error, setError] = useState(false);

  const init = () => {
    dispatch(getCategories());
    dispatch(setFilter({}));
    loadFilteredResults({});
  };

  useEffect(() => {
    init();
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...categoryFilters };

    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      newFilters.filters[filterBy] = handlePrice(filters);
    }
    dispatch(setFilter(newFilters));

    setSkip(0);

    loadFilteredResults(categoryFilters.filters);

    setCategoryFilters(newFilters);
  };

  const handlePrice = (filters) => {
    return prices.filter((item) => item._id == filters)[0].array;
  };

  const loadFilteredResults = (newFilters) => {
    dispatch(getFilteredProducts(0, limit, newFilters));
  };

  const loadMore = () => {
    const toSkip = skip + limit;

    dispatch(getFilteredProducts(toSkip, limit, categoryFilters.filters));

    setSkip(toSkip);
  };

  const loadMoreButton =
    products && totalCount > products.length ? (
      <div className="text-center">
        <button className="btn btn-warning mb-5" onClick={loadMore}>
          Load More
        </button>
      </div>
    ) : (
      ""
    );

  return (
    <Layout
      title="Shop Page"
      description="Search and find your poison"
      className={"container-fluid"}
    >
      <div className="row">
        <div className="col-2">
          <div className="card">
            <h4 className="card-header mb-2">Filter by Categories</h4>
            <ul>
              <CheckBox
                categories={categories}
                handleFilters={(filters) => handleFilters(filters, "category")}
              />
            </ul>
          </div>
          <div className="card mt-2">
            <h4 className="card-header">Filter by Price</h4>
            <div className="m-2" style={{ paddingLeft: "2rem" }}>
              <RadioBox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            </div>
          </div>
        </div>
        <div className="col-10">
          <div className="text-center">
            <h2 className="mb-4">Products</h2>
          </div>
          <div className="row">
            {products.map((item, idx) => (
              <div key={item._id} className="col-4 mb-3">
                <Card product={item} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
