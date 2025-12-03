import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCreateOrderMutation } from "../redux/features/order/order";
import { toast } from "react-toastify";
import { clearCart } from "../redux/features/cart/cart";

const OrderPage = () => {
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const [deliveryMethod, setDeliveryMethod] = useState("Delivery");

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      address: {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.address?.phone || "",
        upozilla: user?.address?.upozilla || "",
        city: user?.address?.city || "",
      },
      paymentMethod: "Card",
    },
  });

  const onSubmit = async (data) => {
    try {
      const orderData = {
        user: user._id,
        item: cartItems.map((i) => ({
          product: i._id,
          quantity: i.qty,
          price: i.discountPrice || i.price,
        })),
        address: data.address,
        paymentMethod: data.paymentMethod,
        paymentStatus: "Pending",
      };
      const result = await createOrder(orderData).unwrap();
      toast.success(result.message || "Order created successfully");
      dispatch(clearCart());
      navigate("/success");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const inputClass =
    "w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none mb-3";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [cartItems]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center md:text-left">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Shipping Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Shipping Information
          </h2>

          {/* Input fields */}
          <input
            {...register("address.name")}
            placeholder="Full Name"
            className={inputClass}
          />
          <input
            {...register("address.email")}
            placeholder="Email Address"
            className={inputClass}
          />
          <input
            {...register("address.phone")}
            placeholder="Phone Number"
            className={inputClass}
          />
          <input
            {...register("address.city")}
            placeholder="city"
            className={inputClass}
          />
          <input
            {...register("address.upozilla")}
            placeholder="upozilla"
            className={inputClass}
          />
          <div className="grid grid-cols-3 gap-3">
            <p>cash on delivery</p>
            <p>Bkash</p>
            <p>Nagad</p>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold mt-4 hover:bg-primary/90 transition"
          >
            Pay Now
          </button>
        </form>

        {/* Cart Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sticky top-5 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Review your cart
          </h2>
          <div className="flex-1 space-y-4 max-h-[500px] overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-gray-800 font-semibold">{item.name}</h3>
                  <p className="text-gray-500">{item.qty}x</p>
                </div>
                <p className="text-gray-800 font-semibold">
                  ৳{Math.ceil((item.discountPrice || item.price) * item.qty)}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t pt-3">
            <p className="flex justify-between text-gray-700">
              Subtotal <span>৳{Math.ceil(totalPrice)}</span>
            </p>
            <p className="flex justify-between text-gray-700">
              Shipping <span>৳130</span>
            </p>
            <p className="flex justify-between text-gray-700">
              Discount <span>৳0</span>
            </p>
            <p className="flex justify-between font-semibold text-gray-800 text-lg border-t pt-2">
              Total <span>৳{Math.ceil(totalPrice + 130)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
