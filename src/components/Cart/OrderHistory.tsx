import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectOrders, Order } from "../../redux/Slices/orderSlice";

const OrderHistory: React.FC = () => {
  const orders = useSelector(selectOrders);

  // Hàm định dạng thời gian
  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Số đơn hàng mỗi trang

  // Tính toán chỉ số đơn hàng để hiển thị
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Cuộn lên đầu danh sách mỗi khi trang hiện tại thay đổi
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Order History</h2>

      {orders.length === 0 ? (
        <p className="text-center text-lg">You have no orders yet.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {currentOrders.map((order: Order) => (
            <li key={order.id} className="py-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Order ID: {order.id}</h3>
                <p className="text-sm text-gray-500">
                  Placed on: {formatDateTime(order.createdAt)}
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
                    Total Price:
                    <span className="text-blue-600 ml-2">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </h4>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Phân trang chỉ hiển thị nếu có đơn hàng */}
      {orders.length > 0 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
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

export default OrderHistory;
