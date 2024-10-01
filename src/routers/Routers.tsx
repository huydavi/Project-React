import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import Homepage from "../pages/Homepage";
import Shop from "../pages/Shop";
import Cart from "../components/Cart/Cart";
import Checkout from "../components/Cart/CheckOut";
import ProductCartDetail from "../components/Cart/ProductCartDetail";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

function Routers() {
  return (
    <BrowserRouter>
      <Navbars />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/products/:id" element={<ProductCartDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Routers;
