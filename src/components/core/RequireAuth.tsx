import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";
import { isAuthenticated } from "../../services/auth/authService";

const handleAuthorization = (role: number) => {
  if (role === 0) {
    return <Outlet />;
  }

  return isAuthenticated()!.user.role === role ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
};

const RequireAuths = ({ role = 0 }) =>
  isAuthenticated() ? handleAuthorization(role) : <Navigate to={"/signin"} />;
export default RequireAuths;
