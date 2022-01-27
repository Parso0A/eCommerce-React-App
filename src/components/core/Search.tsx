import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, selectCategories } from "../../store/categories";
import {
  getMainPageProducts,
  selectMainPageProducts,
} from "../../store/products";
import { Product } from "../../global/models/product/product";

interface SearchFormState {
  selectedCategory: string;
  searchTerm: string;
  searched: boolean;
}

const Search = () => {
  const [data, setData] = useState<SearchFormState>({
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

  const handleChange = (name: string) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (hasSearched: boolean, results: Array<Product>) => {
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
            data-testid="home-search-input"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button data-testid="home-search-submit" className="input-group-text">
            Search
          </button>
        </div>
      </span>
    </form>
  );

  const searchedProducts = (results: Array<Product> = []) => (
    <div>
      <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
      <div className="row">
        {result.map((item, idx) => (
          <div key={item._id} className="col-4 mb-3">
            <Card product={item} />
          </div>
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
