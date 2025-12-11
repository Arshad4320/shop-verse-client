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
  console.log(user);
  const orderInfo = useSelector((state) => state.order);

  const orders =
    data?.data?.filter((order) => {
      if (user) {
        return order.user?._id === user?._id;
      } else if (orderInfo?.phone) {
        return order.address.phone === orderInfo?.phone;
      }
      return false;
    }) || [];

  console.log(orders);
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  return (
    <div className="mx-auto max-w-5xl my-10 p-5 space-y-4">
      <div className="bg-white p-6 rounded-xl shadow-sm ">
        <h1 className="text-xl sm:text-2xl text-center font-semibold text-text">
          Welcome, {user?.name || orderInfo.name}👋
        </h1>
        <p className="text-gray-600 text-center mt-1">
          Manage your account and orders
        </p>
      </div>

      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 bg-white p-6 rounded-xl shadow-sm">
        <div>
          <p className="font-semibold text-gray-700">Name</p>
          <p className="text-gray-600">{user?.name || orderInfo?.name}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Upozila</p>
          <p className="text-gray-600">
            {user?.address?.upozila || orderInfo?.upozila}
          </p>
        </div>
        <div>
          <p className="font-semibold  text-gray-700">Zilla</p>
          <p className="text-gray-600">
            {user?.address?.zilla || orderInfo?.zila}
          </p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Phone</p>
          <p className="text-gray-600">
            {user?.address?.phone || orderInfo?.phone}
          </p>
        </div>

        {/* Email (always last) */}
      {/* <div className="md:col-span-3">
        {user?.email && (
          <>
            <p className="font-semibold mt-4 text-gray-700">Email</p>
            <p className="text-gray-600">{user?.email}</p>
          </>
        )}
      </div> */}
      {/* </div> */}

      <div className="bg-white p-6 rounded-xl shadow-sm ">
        <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

        {orders.length > 0 ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className=" rounded-lg p-5 shadow-sm hover:shadow-md transition bg-gray-50"
              >
                <div className="flex  justify-between items-start">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-800">
                      Order #{order._id.slice(0, 8)}
                    </p>

                    <p className="text-sm text-gray-600">
                      Items:{" "}
                      <span className="font-medium">{order.item.length}</span>
                    </p>

                    {/* Conditional Customer Name */}
                    <p className="text-sm text-gray-600">
                      Customer:{" "}
                      <span className="font-medium">
                        {order?.address?.name?.trim() || orderInfo?.name}
                      </span>
                    </p>

                    <p className="text-sm text-gray-600">
                      Address: {order.address.upozila || orderInfo?.upozila},{" "}
                      {order.address.upozilla || orderInfo?.zila}
                    </p>

                    <p className="text-sm text-gray-600">
                      Phone:{" "}
                      {order?.address?.phone
                        ? order.address.phone
                        : user?.address?.phone}
                    </p>

                    <p className="text-sm text-gray-600">
                      Payment: {order.paymentMethod}{" "}
                      <span
                        className={`px-2 py-0.5 rounded text-white ml-1 text-xs ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-600"
                            : "bg-yellow-600"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => openModal(order)}
                    className="px-2 py-1 text-primary text-2xl rounded-md hover:text-purple-700 transition"
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
