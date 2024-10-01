// src/components/Cart.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CartItem,
  selectCartItems,
  addToCart,
  removeFromCart,
} from "../../redux/Slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import ModalChangeAddress from "../Address/ModalChangeAddress";
import ChangeAddress from "../Address/ChangeAddress";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const [address, setAddress] = useState("hcm, q12");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const totalPrice = items.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = items.reduce(
    (total: number, item: CartItem) => total + item.quantity,
    0
  );

  const increaseQuantity = (item: CartItem) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const decreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      dispatch(addToCart({ ...item, quantity: -1 }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="container mx-auto p-6 flex">
      <div className="flex-1 mr-4">
        <h2 className="text-3xl font-bold mb-6 text-center">CART</h2>
        {items.length === 0 ? (
          <p className="text-lg text-center">CART IS EMPTY.</p>
        ) : (
          <div>
            <ul className="border rounded-lg shadow-lg divide-y divide-gray-300">
              {items.map((item: CartItem) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center p-4 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover mr-4 rounded shadow"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <div className="flex items-center text-gray-700">
                        <button
                          onClick={() => decreaseQuantity(item)}
                          className="bg-gray-200 p-1 rounded hover:bg-gray-300 transition mr-2"
                        >
                          -
                        </button>
                        <span className="mx-2 font-bold">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item)}
                          className="bg-gray-200 p-1 rounded hover:bg-gray-300 transition"
                        >
                          +
                        </button>
                        <span className="ml-4">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-lg text-blue-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button>
                      <FaTrash
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-4 text-blue-600 hover:text-blue-800"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex-none w-1/3 bg-gray-100 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">CART TOTAL</h3>
        <div>
          <span>Total Items: </span>
          <span>{totalQuantity}</span>
        </div>
        <div className="my-2">
          <p>Shipping: </p>
          <p>Shipping to: </p>
          <span>{address}</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-2 text-blue-500"
          >
            Change Address
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Total Price:
            <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
          </h3>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Procced to checkout
        </button>
      </div>
      <ModalChangeAddress
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <ChangeAddress
          setAddress={setAddress}
          setIsModalOpen={setIsModalOpen}
        />
      </ModalChangeAddress>
    </div>
  );
};

export default Cart;
