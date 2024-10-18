import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrder,
  deleteOrder,
  updateOrder,
  selectOrders,
  Order,
} from "./../redux/Slices/orderSlice";

const AdminOrder: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  const [newOrder, setNewOrder] = useState<Order>({
    id: "",
    items: [],
    totalPrice: 0,
    createdAt: new Date().toISOString(),
    shippingAddress: "",
    paymentMethod: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Số đơn hàng mỗi trang

  const handleAddOrder = () => {
    dispatch(addOrder(newOrder));
    resetForm();
  };

  const handleUpdateOrder = (id: string) => {
    dispatch(updateOrder({ id, updatedData: newOrder }));
    resetForm();
  };

  const handleDeleteOrder = (id: string) => {
    dispatch(deleteOrder(id));
  };

  const resetForm = () => {
    setNewOrder({
      id: "",
      items: [],
      totalPrice: 0,
      createdAt: new Date().toISOString(),
      shippingAddress: "",
      paymentMethod: "",
    });
  };

  // Tính toán các đơn hàng cần hiển thị
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Điều chỉnh trang về đầu mỗi lần thay đổi trang
  const handlePageChange = (direction: "next" | "prev") => {
    const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    setCurrentPage(newPage);
    window.scrollTo(0, 0); // Cuộn về đầu trang
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Orders</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Add / Update Order</h3>
        <input
          type="text"
          placeholder="Shipping Address"
          value={newOrder.shippingAddress}
          onChange={(e) =>
            setNewOrder({ ...newOrder, shippingAddress: e.target.value })
          }
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Payment Method"
          value={newOrder.paymentMethod}
          onChange={(e) =>
            setNewOrder({ ...newOrder, paymentMethod: e.target.value })
          }
          className="border p-2 rounded mb-2 w-full"
        />
        {/* Add other input fields as needed */}

        {/* <button
          onClick={handleAddOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Add Order
        </button> */}
        <button
          onClick={() => handleUpdateOrder(newOrder.id)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Update Order
        </button>
      </div>

      {currentOrders.length === 0 ? (
        <p className="text-center text-lg">You have no orders yet.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {currentOrders.map((order: Order) => (
            <li key={order.id} className="py-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Order ID: {order.id}</h3>
                <p className="text-sm text-gray-500">
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm">
                  Shipping Address: {order.shippingAddress}
                </p>
                <p className="text-sm">Payment Method: {order.paymentMethod}</p>
              </div>

              <div className="bg-white p-4 shadow-lg rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Items:</h4>
                <ul className="divide-y divide-gray-300">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between py-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4 flex-1">
                        <h5 className="font-semibold">{item.name}</h5>
                        <p>
                          {item.quantity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4">
                  <h4 className="font-semibold">
                    Total Price:{" "}
                    <span className="text-blue-600 ml-2">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </h4>
                </div>

                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Delete Order
                </button>
                <button
                  onClick={() => setNewOrder(order)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 ml-2"
                >
                  Edit Order
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Phân Trang chỉ hiển thị nếu có đơn hàng */}
      {orders.length > 0 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminOrder;
