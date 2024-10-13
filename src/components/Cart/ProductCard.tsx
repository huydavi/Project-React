import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Product,
  selectAllData,
  selectData,
  setItems,
} from "../../redux/Slices/dataSlice";
import axiosClient from "../../api/axiosClient";
import { FaStar } from "react-icons/fa";
import { addToCart } from "../../redux/Slices/cartSlice";
import { useNavigate } from "react-router-dom";
import SortOptions from "./SortOptions";
import { selectSearchTerm } from "../../redux/Slices/searchSlice";
import { selectUser } from "../../redux/Slices/userSlice";

interface ProductCardProps {
  title: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title }) => {
  const dispatch = useDispatch();
  const allItems = useSelector(selectAllData);
  const searchTerm = useSelector(selectSearchTerm);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);
  const limit = 5;
  const [sortKey, setSortKey] = useState<string>("quantity");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const fetchData = async (page: number) => {
    try {
      const response = await axiosClient.get(
        `/products?_page=${page}&_limit=${limit}&_sort=${sortKey}&_order=${sortOrder}`
      );
      const data = response.data || response;

      dispatch(setItems(data));

      const totalItems = response.headers["x-total-count"];
      setTotalPages(Math.ceil(totalItems / limit));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, dispatch, sortKey, sortOrder]);

  const handleAddToCart = (item: Product) => {
    if (!user) {
      alert("Bạn cần phải đăng nhập để thêm sản phẩm vào giỏ hàng");
      navigate("/login");
    } else {
      dispatch(
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
        })
      );
      alert("Sản phẩm đã được thêm vào giỏ hàng");
    }
  };

  const handleViewDetail = (id: number) => {
    navigate(`/products/${id}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Hàm xử lý sắp xếp
  const handleSort = (sortKey: string, order: "asc" | "desc") => {
    setSortKey(sortKey);
    setSortOrder(order);
  };

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredItems = allItems.filter(
    (
      item: Product // Chỉ định kiểu cho item
    ) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      <SortOptions onSort={handleSort} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
        {filteredItems.map((item: Product) => (
          <div
            key={item.id}
            onClick={() => handleViewDetail(item.id)}
            className="bg-white p-4 shadow rounded relative border transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={item.image}
              className="w-full h-48 object-cover mb-4"
              alt={item.name}
            />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <p>Quantity:{item.quantity}</p>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
            </div>
            <div
              onClick={() => handleAddToCart(item)}
              className="absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-blue-600 group text-white text-sm 
            rounded-full hover:w-32 hover:bg-blue-700 transition-all"
            >
              <span className="group-hover:hidden">+</span>
              <span className="hidden group-hover:block">Add To Cart</span>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previos Page
        </button>

        <p>
          Page {currentPage} of {totalPages}
        </p>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
