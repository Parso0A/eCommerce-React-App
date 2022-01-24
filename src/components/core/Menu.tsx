import React, { Fragment } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, signOut } from "../../services/auth/authService";
import { totalCartQuantity } from "../../services/cart/cartService";
import { NavigateFunction } from "react-router";

const isActive = (location, path) => {
  if (location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    return <Component navigate={navigate} location={location} {...props} />;
  };

  return Wrapper;
};

interface MenuProps {
  location: Location;
  navigate: NavigateFunction;
}

const Menu = ({ location, navigate }: MenuProps) => {
  const authenticated = isAuthenticated();

  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(location, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(location, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(location, "/cart")}
            to="/cart"
          >
            Cart
            <sup>
              <small className="cart-badge">{totalCartQuantity()}</small>
            </sup>
          </Link>
        </li>

        {authenticated &&
          (authenticated.user.role === 1 ? (
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(location, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                Dashboard
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(location, "/user/dashboard")}
                to="/user/dashboard"
              >
                Dashboard
              </Link>
            </li>
          ))}

        {!authenticated && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(location, "/signin")}
                to="/signin"
              >
                Sign In
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(location, "/signup")}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </Fragment>
        )}

        {authenticated && (
          <li>
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#ffffff" }}
              onClick={() => {
                signOut(() => navigate("/"));
              }}
            >
              Sign Out
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
