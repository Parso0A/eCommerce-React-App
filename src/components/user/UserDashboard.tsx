import React from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../services/auth/authService";

const Dashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated()!;

  const userLinks = (
    <div className="card">
      <h4 className="card-header">User Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to={"/cart"}>
            My Cart
          </Link>
        </li>
      </ul>
    </div>
  );

  const userInfo = (
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
        <div className="col-md-3">{userLinks}</div>
        <div className="col-md-9">
          {userInfo}
          {purchaseHistory}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
