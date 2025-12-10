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
    <div className="max-w-7xl mx-auto mt-20 px-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

      {/* ========== Header Row ========== */}
      <div className="hidden md:grid grid-cols-12 border-b py-3 text-sm font-bold text-text">
        <div className="col-span-6 text-lg">Product</div>
        <div className="col-span-2 text-center text-lg">Price</div>
        <div className="col-span-2 text-center text-lg">Quantity</div>
        <div className="col-span-2 text-right text-lg">Total</div>
      </div>

      {cartItems.map((item) => {
        const price = item.discountPrice > 0 ? item.discountPrice : item.price;
        const subtotal = price * item.qty;

        return (
          <div
            key={item._id}
            className="grid grid-cols-2 md:grid-cols-12 py-3 border-b gap-4 md:gap-0"
          >
            {/* PRODUCT (Mobile: full width | Desktop: col-span-6) */}
            <div className="md:col-span-6 flex gap-4">
              <img
                src={item.images}
                className="w-20 h-20 rounded object-cover border"
              />

              <div>
                <p className="font-semibold text-text">{item.name}</p>

                <p className="text-text text-sm font-medium">Qty: {item.qty}</p>
                <p className="text-text text-sm font-medium">
                  Size: {item.sizes}
                </p>

                <p className="text-sm flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <span className="text-text">In Stock</span>
                </p>
              </div>
            </div>

            {/* PRICE (Mobile stacked bottom | Desktop center) */}
            <div className="md:col-span-2 flex md:justify-center items-center text-gray-800 font-semibold">
              <span className="md:hidden text-sm font-medium text-gray-500 mr-2">
                Price:
              </span>
              <FaBangladeshiTakaSign />
              {price}
            </div>

            {/* QUANTITY */}
            <div className="md:col-span-2 flex items-center md:justify-center gap-4 ">
              <button
                onClick={() => handleQuantity(item._id, "dec")}
                className="text-md w-8 h-8 border rounded-full border-primary bg-purple-100 flex items-center justify-center   hover:bg-gray-100"
              >
                −
              </button>

              <span className="font-semibold">{item.qty}</span>

              <button
                onClick={() => handleQuantity(item._id, "inc")}
                className="text-md w-8 h-8 border rounded-full border-primary bg-purple-100 flex items-center justify-center   hover:bg-gray-100"
              >
                +
              </button>
            </div>

            {/* TOTAL */}
            <div className="md:col-span-2 flex md:justify-end items-center text-gray-800 font-semibold">
              <span className="md:hidden text-sm font-medium text-gray-500 mr-2">
                Total:
              </span>
              <FaBangladeshiTakaSign />
              {subtotal.toFixed(2)}
            </div>
          </div>
        );
      })}

      {/* ========== Summary Bottom Section ========== */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-8 gap-4 md:gap-0">
        <button className="text-gray-700 hover:underline font-medium">
          CONTINUE SHOPPING
        </button>

        <div className="text-right">
          <p className="text-gray-800 font-semibold text-lg">
            Sub Total:
            <span className="ml-2 text-text flex items-center gap-2 justify-end">
              {" "}
              <FaBangladeshiTakaSign />
              {totalPrice.toFixed(2)}
            </span>
          </p>

          <p className="text-xs text-gray-500">Excl. Tax and Delivery charge</p>

          <button
            onClick={handleCheckout}
            className="mt-3 px-6 py-3 bg-primary text-white rounded-md hover:bg-indigo-700 font-semibold w-full md:w-auto"
          >
            GO TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
