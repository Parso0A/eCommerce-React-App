import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";
import { selectUser } from "../../store/auth";
import { useSelector } from "react-redux";

const handleAuthorization = (user, role) => {
  if (role === 0) {
    return <Outlet />;
  }

  return user.role === role ? <Outlet /> : <Navigate to={"/"} />;
};

const RequireAuths = ({ role = 0 }) => {
  const user = useSelector(selectUser);

  return user ? handleAuthorization(user, role) : <Navigate to={"/signin"} />;
};
export default RequireAuths;
