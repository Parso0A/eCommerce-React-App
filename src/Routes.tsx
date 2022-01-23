import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/user/Signup";
import Signin from "./components/user/Signin";
import Home from "./components/core/Home";
import Dashboard from "./components/user/UserDashboard";
import RequireAuths from "./components/core/RequireAuth";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddCategory from "./components/admin/AddCategory";
import AddProduct from "./components/admin/AddProduct";
import Shop from "./components/core/Shop";
import Product from "./components/core/Product";
import Cart from "./components/core/Cart";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route element={<RequireAuths />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route element={<RequireAuths role={1} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/create/category" element={<AddCategory />} />
          <Route path="/create/product" element={<AddProduct />} />
        </Route>
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
