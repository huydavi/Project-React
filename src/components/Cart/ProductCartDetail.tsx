import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosClient from "../../api/axiosClient";
import { addToCart } from "../../redux/Slices/cartSlice";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();

  const fetchProductDetail = async () => {
    try {
      const response = await axiosClient.get(`/products/${id}`);
      setProduct(response.data || response);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        })
      );
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 max-w-md rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">{product.name}</h2>
          <p className="text-2xl font-semibold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            {product.description}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
