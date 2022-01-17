import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/category/categoryService";
import { getMainPageProducts } from "../../services/product/productService";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    selectedCategory: "",
    searchTerm: "",
    result: [],
    searched: false,
  });

  const { categories, selectedCategory, searchTerm, result, searched } = data;

  const loadCategories = () => {
    getCategories().then((cats) => {
      if (cats.error) {
        console.log(cats.error);
      } else {
        setData({ ...data, categories: cats });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (!searched) {
      getMainPageProducts({
        search: searchTerm || undefined,
        category: selectedCategory,
      }).then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          setData({ ...data, result: res, searched: true });
        }
      });
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
            style={{ marginRight: "10px" }}
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
