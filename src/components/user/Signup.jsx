import React, { useState } from "react";
import { API } from "../../config";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated, signUp } from "../../services/auth/authService";
import { Navigate } from "react-router";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });

    signUp({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = (
    <form>
      {isAuthenticated() && <Navigate to={"/"} />}
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button
        onClick={clickSubmit}
        type="submit"
        className="btn btn-primary mt-2"
      >
        Submit
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
  const showSuccess = (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New Account created, please <Link to={"/signin"}>Sign In</Link>.
    </div>
  );
  return (
    <Layout
      title="Sign Up"
      description="Sign Up to enjoy"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess}
      {showError}
      {signUpForm}
    </Layout>
  );
};

export default Signup;
