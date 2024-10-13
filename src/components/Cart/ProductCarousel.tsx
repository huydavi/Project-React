import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product, selectAllData, setItems } from "../../redux/Slices/dataSlice";
import axiosClient from "../../api/axiosClient";
import { FaStar } from "react-icons/fa";
import { addToCart } from "../../redux/Slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/Slices/userSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCarousel: React.FC = () => {
  const dispatch = useDispatch();
  const allItems = useSelector(selectAllData);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [itemsToDisplay, setItemsToDisplay] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(`/products?_limit=20`);
      const data = response.data || response;

      dispatch(setItems(data));
      setItemsToDisplay(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Top Product</h2>
      <Slider {...settings}>
        {itemsToDisplay.map((item: Product) => (
          <div key={item.id}>
            <div
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
              <p>Quantity: {item.quantity}</p>
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
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
