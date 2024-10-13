import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import Homepage from "../pages/Homepage";
import Shop from "../pages/Shop";
import Cart from "../components/Cart/Cart";
import Checkout from "../components/Cart/CheckOut";
import ProductCartDetail from "../components/Cart/ProductCartDetail";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import AdminPage from "../pages/AdminPage";
import Order from "../pages/Order";
import OrderHistory from "../components/Cart/OrderHistory";
import Admin from "../pages/Admin";

function Routers() {
  return (
    <BrowserRouter>
      <Navbars />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/products/:id" element={<ProductCartDetail />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Routers;
