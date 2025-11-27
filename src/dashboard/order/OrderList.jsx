import React, { useState } from "react";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../redux/features/order/order";
import { FaBangladeshiTakaSign, FaRegEyeSlash } from "react-icons/fa6";
import ProductViewModal from "../../components/ProductViewModal";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
const OrderList = () => {
  const [deleteItem] = useDeleteOrderMutation();
  const { data: orders, isLoading, isError } = useGetAllOrdersQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const handleDelete = async (item) => {
    try {
      const result = await deleteItem(item);

      toast.success(result?.data?.message);
    } catch (err) {
      console.log(err);
    }
    console.log(item);
  };
  if (isLoading) {
    return <p>Loading orders...</p>;
  }

  if (isError) {
    return <p>Something went wrong while fetching orders.</p>;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm ">
      <h2 className="text-xl font-semibold mb-4">Order List</h2>

      {orders?.data?.length > 0 ? (
        <div className="space-y-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {orders?.data?.map((order, index) => (
            <div
              key={index}
              className=" rounded-lg p-5 shadow-sm hover:shadow-md transition bg-gray-50"
            >
              <div className="flex flex-col sm:flex-row space-y-4  sm:justify-between items-start">
                {/* Order Info */}
                <div className="space-y-1">
                  <p className="font-semibold text-gray-800">
                    Order {order._id.slice(0, 4)}
                  </p>

                  <p className="text-sm text-gray-600">
                    Items:{" "}
                    <span className="font-medium">{order.item.length}</span>
                  </p>

                  <p className="text-sm text-gray-600">
                    Customer: {order?.user?.name}
                  </p>

                  <p className="text-sm text-gray-600">
                    Address: {order.address.city}, {order.address.upozilla}
                  </p>

                  <p className="text-sm text-gray-600">
                    Phone: {order.address.phone}
                  </p>

                  <p className="text-sm text-gray-600">
                    Payment: {order.paymentMethod}{" "}
                    <span
                      className={`px-2 py-0.5 rounded text-white ml-1 text-xs
                          ${
                            order.paymentStatus === "Paid"
                              ? "bg-green-600"
                              : "bg-yellow-600"
                          }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </p>
                </div>

                {/* View Button */}
                <div>
                  <button
                    onClick={() => {
                      handleDelete(order?._id);
                    }}
                    className="text-danger text-2xl"
                  >
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => openModal(order)}
                    className="px-2 py-1  text-primary text-2xl rounded-md hover:text-purple-700 transition"
                  >
                    <FaRegEyeSlash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No orders found</p>
      )}
      <ProductViewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderList;
