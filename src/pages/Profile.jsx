import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllOrdersQuery } from "../redux/features/order/order";
import ProductViewModal from "../components/ProductViewModal";
import { FaRegEyeSlash } from "react-icons/fa6";

const Profile = () => {
  const { data, isLoading } = useGetAllOrdersQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const orders =
    data?.data?.filter((order) => order.user?._id === user?._id) || [];

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  return (
    <div className="mx-auto max-w-5xl my-10 p-5 space-y-4">
      <div className="bg-white p-6 rounded-xl shadow-sm ">
        <h1 className="text-2xl font-semibold">Welcome, {user?.name} 👋</h1>
        <p className="text-gray-600 mt-1">Manage your account and orders</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-white p-6 rounded-xl shadow-sm ">
        <div>
          <p className="font-semibold text-gray-700">Name</p>
          <p className="text-gray-600">{user?.name}</p>

          <p className="font-semibold mt-4 text-gray-700">Email</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">City</p>
          <p className="text-gray-600">{user?.address?.city}</p>

          <p className="font-semibold mt-4 text-gray-700">Upozilla</p>
          <p className="text-gray-600">{user?.address?.upozilla}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Phone</p>
          <p className="text-gray-600">{user?.address?.phone}</p>

          <p className="font-semibold mt-4 text-gray-700">User Type</p>
          <p className="text-gray-600">{user?.userType}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm ">
        <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

        {orders.length > 0 ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className=" rounded-lg p-5 shadow-sm hover:shadow-md transition bg-gray-50"
              >
                <div className="flex flex-col sm:flex-row space-y-4  sm:justify-between items-start">
                  {/* Order Info */}
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-800">
                      Order #{order._id.slice(0, 8)}
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
                  <button
                    onClick={() => openModal(order)}
                    className="px-2 py-1  text-primary text-2xl rounded-md hover:text-purple-700 transition"
                  >
                    <FaRegEyeSlash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No orders found</p>
        )}
      </div>

      <ProductViewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default Profile;
