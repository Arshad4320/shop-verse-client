import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart,
  updateQty,
} from "../redux/features/cart/cart";
import { useNavigate, Link } from "react-router-dom";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice, totalQty } = useSelector(
    (state) => state.cart
  );
  console.log(cartItems);
  const handleQuantity = (id, type) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) return;

    let newQty =
      type === "inc" ? item.qty + 1 : item.qty > 1 ? item.qty - 1 : 1;

    dispatch(updateQty({ id, qty: newQty }));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/order", { state: { cartItems, totalPrice, totalQty } });
  };

  return (
    <div className="max-w-7xl mx-auto gird  min-h-screen mt-20">
      <h1 className=" text-2xl md:text-3xl font-bold text-center text-gray-800  mb-8">
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-2xl text-gray-600 mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="px-8 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => {
              const price = Math.ceil(
                item.discountPrice > 0 ? item.discountPrice : item.price
              );
              const subtotal = item.qty * price;

              return (
                <div
                  key={item._id}
                  className="flex  gap-4 p-4  bg-white shadow"
                >
                  <img
                    src={item.images}
                    alt={item.name}
                    className="w-28 h-28 object-cover "
                  />

                  <div className="flex-1">
                    {/* TITLE */}
                    <div className="flex justify-between items-center">
                      <h2 className="text:md md:text-lg font-semibold text-gray-800">
                        {item.name}
                      </h2>

                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="text-red-500  font-bold text-xl "
                      >
                        ✕
                      </button>
                    </div>

                    {/* PRICE */}
                    <div className=" flex items-center gap-2">
                      {item.discountPrice > 0 && (
                        <span className="line-through text-gray-400 flex items-center gap-1 text-sm md:text-md lg:text-lg font-bold">
                          <FaBangladeshiTakaSign />
                          {Math.ceil(item.price)}
                        </span>
                      )}

                      <span className="text-green-600 flex items-center gap-1 text-sm md:text-md lg:text-lg font-bold">
                        <FaBangladeshiTakaSign /> {price}
                      </span>
                    </div>

                    {/* QUANTITY CONTROLLER */}
                    <div className="mt-1 flex items-center gap-2">
                      {/* Decrease Btn */}
                      <button
                        className="px-2 py-0.5  bg-gray-200 hover:bg-gray-300 
                        active:scale-95 transition font-bold text-lg"
                        onClick={() => handleQuantity(item._id, "dec")}
                      >
                        −
                      </button>

                      {/* Qty Box */}
                      <span
                        className="px-2 py-1 text-primary  bg-gray-200 hover:bg-gray-300 
                        active:scale-95 transition font-semibold text-md"
                      >
                        {item.qty}
                      </span>

                      {/* Increase Btn */}
                      <button
                        className="px-2 py-0.5  bg-gray-200 hover:bg-gray-300 
                        active:scale-95 transition font-bold text-lg"
                        onClick={() => handleQuantity(item._id, "inc")}
                      >
                        +
                      </button>
                    </div>

                    {/* SUBTOTAL */}
                    <p className="mt-3 font-semibold text-gray-700">
                      Subtotal:{" "}
                      <span className="text-primary">৳ {subtotal}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SUMMARY CARD */}
          <div className="bg-white   h-fit sticky top-15 p-4">
            <h2 className="text-xl md:text-2xl font-semibold mb-5 text-text">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3 text-gray-700 font-medium">
              <p>Total Items:</p>
              <p>{totalQty}</p>
            </div>

            <div className="flex justify-between mb-6 text-gray-700 font-medium">
              <p>Total Price:</p>
              <p className="text-primary font-bold text-lg">
                ৳ {Math.ceil(totalPrice)}
              </p>
            </div>

            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-2 md:py-3 mb-3 bg-red-500 text-white  
              hover:bg-red-600 active:scale-95 transition shadow-md"
            >
              Clear Cart
            </button>

            <button
              onClick={handleCheckout}
              className="w-full py-2 md:py-3 mb-3 bg-success text-white  
              hover:bg-green-600 active:scale-95 transition shadow-md"
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
