import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../../services/auth/authService";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCategory } from "../../store/categories";

const AddCategory = () => {
  const [name, setName] = useState("");

  const [error, setError] = useState(false);

  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const dispatch = useDispatch();

  const handleChanges = (event) => {
    setError("");

    setName(event.target.value);
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    setError("");

    setSuccess(false);

    // createCategory(user._id, token, { name }).then((data) => {
    //   if (data.error) {
    //     setError(data.error);
    //   } else {
    //     setError("");
    //     setSuccess(true);
    //     setName("");
    //   }
    // });

    dispatch(createCategory({ name }, user._id));
  };

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

  const handleFocus = () => {
    setSuccess(false);
  };

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
