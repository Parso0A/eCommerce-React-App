import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, selectCategories } from "../../store/categories";
import {
  getMainPageProducts,
  selectMainPageProducts,
} from "../../store/products";
const Search = () => {
  const [data, setData] = useState({
    selectedCategory: "",
    searchTerm: "",
    searched: false,
  });

  const { selectedCategory, searchTerm, searched } = data;

  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);

  const loadCategories = () => {
    dispatch(getCategories());
  };

  const result = useSelector(selectMainPageProducts);

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (!searched) {
      dispatch(
        getMainPageProducts({
          search: searchTerm || undefined,
          category: selectedCategory,
        })
      );

      setData({ ...data, searched: true });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (hasSearched, results) => {
    if (hasSearched && results.length > 0) {
      return `Found ${results.length} Product(s)`;
    } else if (hasSearched) {
      return "No Products Found";
    }
  };

  const searchForm = (
    <form onSubmit={handleSubmit}>
      <span className={"input-group-text"}>
        <div className="input-group-prepend">
          <select
            className={"btn mr-2"}
            style={{
              marginRight: "10px",
              borderColor: "lightgray",
              borderRadius: "0.12rem",
            }}
            onChange={handleChange("selectedCategory")}
          >
            <option value="All">All</option>
            {categories.map((item, idx) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group input-group-large">
          <input
            type="search"
            value={searchTerm}
            className={"form-control"}
            onChange={handleChange("searchTerm")}
            placeholder={"Search..."}
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  const searchedProducts = (results = []) => (
    <div>
      <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
      <div className="row">
        {result.map((item, idx) => (
          <Card product={item} key={item._id} />
        ))}
      </div>
    </div>
  );

  return (
    <div className={"text-center row mb-4"}>
      <div className="container mb-3">{searchForm}</div>
      <div className="container-fluid">{searchedProducts(result)}</div>
    </div>
  );
};

export default Search;
