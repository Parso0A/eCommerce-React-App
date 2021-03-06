import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../../services/auth/authService";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated()!;

  const adminLinks = (
    <div className="card">
      <h4 className="card-header">Admin Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to={"/create/category"}>
            Create Category
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to={"/create/product"}>
            Create Product
          </Link>
        </li>
      </ul>
    </div>
  );

  const adminInfo = (
    <div className="card mb-5 ">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">
          {role === 1 ? "Admin" : "Registered User"}
        </li>
      </ul>
    </div>
  );

  const purchaseHistory = (
    <div className="card mb-5">
      <h3 className="card-header">Purchase History</h3>
      <ul className="list-group">
        <li className="list-group-item">History</li>
      </ul>
    </div>
  );

  return (
    <Layout
      title="Dashboard"
      description={`Howdy ${name} !`}
      className={"container text-center"}
    >
      <div className="row">
        <div className="col-md-3">{adminLinks}</div>
        <div className="col-md-9">
          {adminInfo}
          {purchaseHistory}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
