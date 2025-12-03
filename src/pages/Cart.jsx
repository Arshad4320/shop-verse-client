import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../redux/features/cart/cart";
import { useNavigate, Link } from "react-router-dom";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice, totalQty } = useSelector(
    (state) => state.cart
  );
  console.log(cartItems);
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/order", { state: { cartItems, totalPrice } });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 lg:mb-6 text-center text-text">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-xl mb-4 text-text">Your cart is empty.</p>
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
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 p-2  rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4 w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h2 className="text-md font-medium text-text">
                        {item.name}
                      </h2>
                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        X
                      </button>
                    </div>
                    <div className="flex gap-2 ">
                      {/* <span
                        className={`${
                          item?.discountPrice > 0
                            ? "line-through text-text flex gap-1 items-center"
                            : " flex gap-1 items-center text-success text-[13px] md:text-[15px] font-bold"
                        }`}
                      >
                        <FaBangladeshiTakaSign />{" "}
                        {item?.discountPrice ? Math.ceil(item?.price) : null}
                      </span> */}
                      {/* <span
                        className={`${
                          item?.discountPrice > 0
                            ? "line-through text-text flex gap-1 items-center"
                            : " flex gap-1 items-center text-success text-[13px] md:text-[15px] font-bold"
                        }`}
                      >
                        <FaBangladeshiTakaSign />{" "}
                        {item?.discountPrice ? Math.ceil(item?.price) : null}
                      </span> */}
                      <span className="flex gap-1 items-center text-success  text-[13px] md:text-[15px] font-bold">
                        {item?.discountPrice > 0 && (
                          <span
                            className={`${
                              item?.discountPrice > 0
                                ? "flex gap-1 items-center text-text line-through  text-[13px] md:text-[15px] font-bold"
                                : "hidden"
                            }`}
                          >
                            <FaBangladeshiTakaSign />
                            {Math.ceil(item?.price)}
                          </span>
                        )}
                      </span>
                      {item?.discountPrice > 0 ? (
                        <span className="flex gap-1 items-center text-success  text-[13px] md:text-[15px] font-bold">
                          <FaBangladeshiTakaSign />{" "}
                          {Math.ceil(item?.discountPrice)}
                        </span>
                      ) : (
                        <span className="flex gap-1 items-center text-success  text-[13px] md:text-[15px] font-bold">
                          <FaBangladeshiTakaSign /> {Math.ceil(item?.price)}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 medium">
                      Quantity: {item.qty}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white shadow-md rounded-xl p-4 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-text">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2 font-semibold text-text">
              <p>Total Items:</p>
              <p>{totalQty}</p>
            </div>

            <div className="flex justify-between mb-2 font-semibold text-text">
              <p>Total Price:</p>
              <p>৳ {Math.ceil(totalPrice)}</p>
            </div>

            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
            >
              Clear Cart
            </button>

            <button
              onClick={handleCheckout}
              className="w-full py-2 bg-success text-white rounded hover:bg-green-700 mt-2"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
