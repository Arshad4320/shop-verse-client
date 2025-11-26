import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllOrdersQuery } from "../redux/features/order/order";
import ProductViewModal from "../components/ProductViewModal";

const Profile = () => {
  const { data, isLoading } = useGetAllOrdersQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const orders =
    data?.data?.filter((order) => order.user?._id === user?._id) || [];
  console.log(orders);
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  return (
    <div className="mx-auto max-w-5xl my-10 p-5 space-y-10">
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Your Orders</h2>

        {orders?.length > 0 ? (
          <div className="space-y-4">
            {orders?.map((order, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    Order ID: {order._id.slice(0, 4)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Items: {order.item.length}
                  </p>
                  <p className="text-sm text-gray-600">
                    Name: {order?.user?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Address: {order.address.city},{order.address.upozilla}
                  </p>
                  <p className="text-sm text-gray-600">
                    Phone: {order?.address?.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    Payment Method: {order?.paymentMethod}
                  </p>
                  <p className="text-sm text-gray-600">
                    Order Status: {order?.paymentStatus}
                  </p>
                </div>

                <button
                  onClick={() => openModal(order)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You have no orders</p>
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
