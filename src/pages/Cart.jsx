import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../redux/features/cart/cart";
import { Link } from "react-router";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice, totalQty } = useSelector(
    (state) => state.cart
  );
  console.log("form cart", cartItems, totalPrice, totalQty);
  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <Link
            to="/products"
            className="px-6 py-2 bg-primary text-white rounded"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 p-4 border rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4 w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-primary font-semibold mt-1">
                      ৳ {item.discountPrice || item.price}
                    </p>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white shadow-md rounded-xl p-4 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-3">
              <p>Total Items:</p>
              <p>{totalQty}</p>
            </div>

            <div className="flex justify-between mb-3">
              <p>Total Price:</p>
              <p>৳ {totalPrice}</p>
            </div>

            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
            >
              Clear Cart
            </button>

            <button className="w-full py-2 bg-success text-white rounded hover:bg-green-700 mt-4">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
