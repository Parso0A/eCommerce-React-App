import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../../services/auth/authService";
import { createProduct } from "../../store/products";
import { useSelector, useDispatch } from "react-redux";
import useCategories from "../../hooks/useCategories";

interface AddProductState {
  name: string;
  description: string;
  price: number;
  category: string;
  shipping: boolean;
  quantity: number;
  photo: any;
  loading: boolean;
  error: string | null;
  createdProduct: string;
  redirectToProfile: boolean;
  formData: FormData;
}

const AddProduct = () => {
  const { user } = isAuthenticated()!;

  const categories = useCategories();

  const dispatch = useDispatch();

  const [values, setValues] = useState<AddProductState>({
    name: "",
    description: "",
    price: 0,
    category: "",
    shipping: false,
    quantity: 0,
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: new FormData(),
  });

  const {
    name,
    description,
    price,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  //#region EventHandlers

  const handleChanges = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    formData.set(name, value);

    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: "", loading: true });

    dispatch(createProduct(formData, user._id));

    setValues({
      ...values,
      name: "",
      description: "",
      photo: "",
      price: 0,
      quantity: 0,
      loading: false,
      createdProduct: name,
      error: "",
    });
  };

  //#endregion

  const showLoading = loading ? (
    <div className="alert alert-success">
      <h2>Loading...</h2>
    </div>
  ) : (
    ""
  );

  const newPostForm = (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChanges("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          value={name}
          onChange={handleChanges("name")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          value={description}
          onChange={handleChanges("description")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          type="number"
          value={price}
          onChange={handleChanges("price")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChanges("category")} className="form-control">
          <option>Please Select</option>
          {categories.length > 0
            ? categories.map((item, idx) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))
            : ""}
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={handleChanges("quantity")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChanges("shipping")} className="form-control">
          <option>Please Select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <button className="btn btn-outline-primary mt-2">Create Product</button>
    </form>
  );

  const showError = (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      <h2>{error}</h2>
    </div>
  );

  const showSuccess = (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct} has been created`}</h2>
    </div>
  );

  return (
    <Layout title="Add a new Product" description={`Morning ${user.name}`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading}
          {showSuccess}
          {showError}
          {newPostForm}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
