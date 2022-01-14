import React from "react";
import { useState } from "react/cjs/react.development";
import Layout from "../core/Layout";
import {
  authenticate,
  isAuthenticated,
  signIn,
} from "../../services/auth/authService";
import { Navigate } from "react-router";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false, loading: true });

    signIn({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () =>
          setValues({
            ...values,
            redirectToReferrer: true,
          })
        );
      }
    });
  };

  const signInForm = (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="text"
          value={email}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          value={password}
          className="form-control"
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="btn btn-primary mt-2"
      >
        Sign In
      </button>
    </form>
  );
  const showError = (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = loading && (
    <div className="alert alert-info">
      <h2>Loading...</h2>
    </div>
  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return (
        <Navigate
          to={user.role === 1 ? "/admin/dashboard" : "/user/dashboard"}
          replace={true}
        />
      );
    }

    if (isAuthenticated()) {
      return <Navigate to={"/"} />;
    }
  };
  return (
    <Layout
      title="Sign In"
      description="Sign In to use all features"
      className={"container col-md-4 offset-md-4"}
    >
      {showError}
      {showLoading}
      {redirectUser()}
      {signInForm}
    </Layout>
  );
};

export default Signin;
