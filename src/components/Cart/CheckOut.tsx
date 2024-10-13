import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  CartItem,
  clearCart,
} from "../../redux/Slices/cartSlice";
import { addOrder } from "../../redux/Slices/orderSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid"; 
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);

  const totalPrice = items.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );

  const validationSchema = Yup.object({
    shippingAddress: Yup.string()
      .min(10, "Address is too short")
      .required("Shipping address is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
    cardNumber: Yup.string()
      .min(16, "Card number must be 16 digits")
      .max(16, "Card number must be 16 digits")
      .required("Card number is required"),
    cardExpiry: Yup.string().required("Card expiry is required"),
    cardCVC: Yup.string()
      .min(3, "CVC must be 3 digits")
      .max(3, "CVC must be 3 digits")
      .required("CVC is required"),
  });

  return (
    <div className="container mx-auto p-6 flex">
      <div className="w-2/3 mr-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

        <Formik
          initialValues={{
            shippingAddress: "",
            paymentMethod: "Credit Card",
            cardNumber: "",
            cardExpiry: "",
            cardCVC: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            // Tạo đơn hàng mới
            const newOrder = {
              id: uuidv4(),
              items,
              shippingAddress: values.shippingAddress,
              paymentMethod: values.paymentMethod,
              totalPrice,
              createdAt: new Date().toISOString(),
            };

            console.log("New Order:", newOrder);
            // Lưu đơn hàng vào Redux store
            dispatch(addOrder(newOrder));

            // Xóa giỏ hàng sau khi đặt hàng thành công
            dispatch(clearCart());

            // Reset form
            resetForm();

            // Hiển thị thông báo
            alert("Order placed successfully!");

            // Điều hướng người dùng đến trang lịch sử đơn hàng
            navigate("/order-history");
          }}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white p-6 shadow-lg rounded-lg">
              {/* Shipping Address */}
              <div className="mb-4">
                <label htmlFor="shippingAddress" className="block mb-2">
                  Shipping Address
                </label>
                <Field
                  id="shippingAddress"
                  name="shippingAddress"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="shippingAddress"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-4">
                <label htmlFor="paymentMethod" className="block mb-2">
                  Payment Method
                </label>
                <Field
                  as="select"
                  id="paymentMethod"
                  name="paymentMethod"
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                </Field>
                <ErrorMessage
                  name="paymentMethod"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Card Number */}
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block mb-2">
                  Card Number
                </label>
                <Field
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="cardNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Card Expiry */}
              <div className="mb-4">
                <label htmlFor="cardExpiry" className="block mb-2">
                  Expiry Date
                </label>
                <Field
                  id="cardExpiry"
                  name="cardExpiry"
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="cardExpiry"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* CVC */}
              <div className="mb-4">
                <label htmlFor="cardCVC" className="block mb-2">
                  CVC
                </label>
                <Field
                  id="cardCVC"
                  name="cardCVC"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="cardCVC"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">
                  Total Price:
                  <span className="text-blue-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </h3>
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Phần tóm tắt đơn hàng */}
      <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <ul className="divide-y divide-gray-300">
          {items.map((item: CartItem) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h4 className="font-semibold">{item.name}</h4>
                <p>
                  {item.quantity} x ${item.price.toFixed(2)}
                </p>
              </div>
              <div>
                <span className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Total Price:
            <span className="text-blue-600 ml-2">${totalPrice.toFixed(2)}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
