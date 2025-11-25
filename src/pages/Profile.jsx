import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { useGetAllOrdersQuery } from "../redux/features/order/order";

const Profile = () => {
  const { data, isLoading } = useGetAllOrdersQuery();

  const { user } = useSelector((state) => state.auth);
  const orders =
    data?.data?.filter((order) => order.user?._id === user?._id) || [];
  return (
    <div className="mx-auto max-w-5xl my-10 p-5 space-y-10">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ">Welcome to your profile</h1>

        {/* Edit Profile Button */}
        {/* <Link
          to="/edit-profile"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Edit Profile
        </Link> */}
      </div>

      {/* Profile Info */}
      {user && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow">
          <div>
            <p className="text-lg font-semibold">Name</p>
            <p className="text-gray-700">{user?.name}</p>

            <p className="mt-4 text-lg font-semibold">Email</p>
            <p className="text-gray-700">{user?.email}</p>
          </div>

          <div>
            <p className="text-lg font-semibold">City</p>
            <p className="text-gray-700">{user?.address?.city}</p>

            <p className="mt-4 text-lg font-semibold">Upozilla</p>
            <p className="text-gray-700">{user?.address?.upozilla}</p>
          </div>

          <div>
            <p className="text-lg font-semibold">Phone</p>
            <p className="text-gray-700">{user?.address?.phone}</p>

            <p className="mt-4 text-lg font-semibold">User Type</p>
            <p className="text-gray-700">{user?.userType}</p>
          </div>
        </div>
      )}

      {/* Orders Section */}

      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Your Orders</h2>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-600">
                    Total Price: {order.totalPrice}৳
                  </p>
                  <p className="text-sm text-gray-600">
                    Items: {order.item.length}
                  </p>
                  <p className="text-sm text-gray-500">
                    Shipping: {order.address?.city}, {order.address?.upozilla}
                  </p>
                </div>
                <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                  View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You have no orders</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
