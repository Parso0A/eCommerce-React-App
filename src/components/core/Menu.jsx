import React, { Fragment } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { selectUser } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/auth";
import { selectCartItems } from "../../store/cart";

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

const Menu = ({ location, navigate }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const items = useSelector(selectCartItems);

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
              <small className="cart-badge">{items.length}</small>
            </sup>
          </Link>
        </li>

        {user._id &&
          (user.role === 1 ? (
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

        {!user._id && (
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

        {user._id && (
          <li>
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#ffffff" }}
              onClick={() => {
                dispatch(signOut());
                navigate("/");
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
