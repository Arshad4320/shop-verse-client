import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart,
  updateQty,
} from "../redux/features/cart/cart";
import { useNavigate, Link } from "react-router-dom";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice, totalQty } = useSelector(
    (state) => state.cart
  );

  const handleQuantity = (id, type) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) return;

    const newQty =
      type === "inc" ? item.qty + 1 : item.qty > 1 ? item.qty - 1 : 1;

    dispatch(updateQty({ id, qty: newQty }));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/order", { state: { cartItems, totalPrice, totalQty } });
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="max-w-7xl mx-auto mt-20 px-3 md:px-4 lg:px-6">
          {/* Title */}
          <div className="flex justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Shopping Cart
            </h1>
            <button
              onClick={() => dispatch(clearCart())}
              className="text-red-600 underline text-sm md:text-base font-medium"
            >
              CLEAR CART
            </button>
          </div>
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-12 border-b py-3 text-sm font-semibold text-gray-700">
            <div className="col-span-5 text-lg">Product</div>
            <div className="col-span-2 text-lg text-center">Quantity</div>
            <div className="col-span-2 text-lg text-center">Price</div>
            <div className="col-span-2 text-lg text-right">Total</div>
            <div className="col-span-1 text-lg text-right">Action</div>
          </div>

          {/* Items */}
          {cartItems.map((item) => {
            const price =
              item.discountPrice > 0 ? item.discountPrice : item.price;
            const subtotal = price * item.qty;

            return (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-12 py-5 border-b gap-4 bg-white"
              >
                {/* PRODUCT BLOCK */}
                <div className="col-span-5 flex gap-4 items-start relative">
                  {/* MOBILE CLOSE BUTTON */}
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="absolute top-1 right-2 md:hidden text-red-600  z-10"
                  >
                    <IoCloseSharp size={20} />
                  </button>

                  {/* PRODUCT IMAGE */}
                  <img
                    src={item.images}
                    className="w-20 h-20 rounded object-cover shadow-sm"
                  />

                  {/* MOBILE CONTENT */}
                  <div className="flex-1 md:hidden pr-7">
                    <p className="font-semibold text-text text-base">
                      {item.name}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">
                          Size: {item.sizes}
                        </p>

                        {/* QUANTITY */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => handleQuantity(item._id, "dec")}
                            className="w-5 h-5 md:w-7 md:h-7 border rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 font-semibold"
                          >
                            −
                          </button>

                          <span className="font-semibold">{item.qty}</span>

                          <button
                            onClick={() => handleQuantity(item._id, "inc")}
                            className="w-5 h-5 md:w-7 md:h-7 border rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 font-semibold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        {/* PRICE */}
                        <div className="flex items-center gap-1 mt-2 text-text font-medium">
                          <span className="text-sm text-gray-500">Price:</span>
                          <FaBangladeshiTakaSign size={14} /> {price}
                        </div>

                        {/* TOTAL */}
                        <div className="flex items-center gap-1 text-gray-900 font-medium">
                          <span className="text-sm text-gray-500">Total:</span>
                          <FaBangladeshiTakaSign size={14} /> {subtotal}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DESKTOP PRODUCT INFO */}
                  <div className="hidden md:flex md:flex-col md:gap-1">
                    <p className="font-semibold text-text text-base">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600">Size: {item.sizes}</p>
                    <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                  </div>
                </div>

                {/* QUANTITY (DESKTOP) */}
                <div className="hidden md:flex col-span-2 items-center justify-center gap-3">
                  <button
                    onClick={() => handleQuantity(item._id, "dec")}
                    className="w-8 h-8 border rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 font-bold"
                  >
                    −
                  </button>

                  <span className="font-semibold">{item.qty}</span>

                  <button
                    onClick={() => handleQuantity(item._id, "inc")}
                    className="w-8 h-8 border rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* PRICE (DESKTOP) */}
                <div className="hidden md:flex col-span-2 items-center justify-center text-text font-semibold">
                  <FaBangladeshiTakaSign /> {price}
                </div>

                {/* TOTAL (DESKTOP) */}
                <div className="hidden md:flex col-span-2 items-center justify-end text-gray-900 font-semibold">
                  <FaBangladeshiTakaSign /> {subtotal.toFixed(2)}
                </div>

                {/* ACTION (DESKTOP) */}
                <div className="hidden md:flex col-span-1 justify-end pr-2">
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-600 hover:scale-110 transition"
                  >
                    <IoCloseSharp size={22} />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Summary */}
          <div className="flex justify-end  mt-7 ">
            <div className="text-right w-full md:w-auto">
              <p className="text-lg font-semibold text-text flex justify-end items-center gap-1">
                Sub Total:
                <FaBangladeshiTakaSign />
                {totalPrice.toFixed(2)}
              </p>

              <p className="text-xs mt-1 text-gray-500">
                Excl. Tax and Delivery charge
              </p>

              <button
                onClick={handleCheckout}
                className="mt-3 px-6 py-3 w-auto bg-primary text-white rounded-md hover:bg-indigo-700 font-semibold"
              >
                GO TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* EMPTY CART */
        <div className="flex flex-col justify-center items-center py-32 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Your cart is empty!
          </h2>
          <Link
            to="/products"
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-indigo-700 font-semibold"
          >
            GO TO SHOPPING
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
