import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
      <p className="text-lg mb-6">Your order has been placed successfully.</p>
      <Link
        to="/products"
        className="px-6 py-2 bg-primary text-white rounded hover:bg-purple-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
