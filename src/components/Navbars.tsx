// Navbars.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/Slices/searchSlice";
import { selectTotalQuantity } from "../redux/Slices/cartSlice";

function Navbars() {
  const dispatch = useDispatch();

  const totalQuantity = useSelector(selectTotalQuantity);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value)); // Gửi từ khóa tìm kiếm vào Redux
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between">
        <div className="text-2xl font-bold">
          <Link to="/">Huy Shop</Link>
        </div>
        <div className="relative flex-1 mx-4">
          <form>
            <input
              type="search"
              className="w-full border px-4 py-2"
              placeholder="Search Product"
              onChange={handleSearch}
            />
            <FaSearch className="absolute top-3 right-3 text-blue-500" />
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-lg" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 text-xs">
                {totalQuantity}
              </span>
            )}
          </Link>
          <Link to="/login" className="hidden md:block">
            Login
          </Link>
          <Link to="/register" className="hidden md:block">
            Sign up
          </Link>
          <span className="block md:hidden">
            <FaUser />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-10 py-4 text-sm font-bold">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/shop" className="hover:underline">
          Shop
        </Link>
        <Link to="/" className="hover:underline">
          Contact Us
        </Link>
        <Link to="/" className="hover:underline">
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbars;
