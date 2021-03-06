import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../../services/auth/authService";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCategory } from "../../store/categories";

const AddCategory = () => {
  const [name, setName] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<boolean>(false);

  const { user } = isAuthenticated()!;

  const dispatch = useDispatch();

  //#region EventHandlers

  const handleChanges = (event) => {
    setError("");

    setName(event.target.value);
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    setError("");

    setSuccess(false);

    dispatch(createCategory({ name }, user._id));

    setSuccess(true);
  };

  const handleFocus = () => {
    setSuccess(false);
  };

  //#endregion

  const showSuccess = success ? (
    <div className="alert alert-info">
      <h3 className="text-success">Category created</h3>
    </div>
  ) : (
    ""
  );

  const showError = error ? (
    <div className="alert alert-danger">
      <h3 className="text-danger">{name} should be unique</h3>
    </div>
  ) : (
    ""
  );

  const goBack = (
    <div className="mt-5">
      <Link to={"/admin/dashboard"} className="text-warning">
        Back To Dashboard
      </Link>
    </div>
  );

  const newCategoryForm = (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          value={name}
          className="form-control"
          onChange={handleChanges}
          autoFocus
          onFocus={handleFocus}
        />
      </div>
      <button className="btn btn-outline-primary mt-2">Create Category</button>
    </form>
  );

  return (
    <Layout title="Add a Category" description={`Morning ${user.name}`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess}
          {showError}
          {newCategoryForm}
          {goBack}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
