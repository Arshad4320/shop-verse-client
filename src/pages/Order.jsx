import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCreateOrderMutation } from "../redux/features/order/order";
import { toast } from "react-toastify";
import { clearCart } from "../redux/features/cart/cart";
import { setOrderInfo } from "../redux/features/order/orderSlice";

import cash from "../assets/cash.jpg";
import bkash from "../assets/bkash.svg";
import nagad from "../assets/nagad.png";

const OrderPage = () => {
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.address?.phone || "",
        upozila: user?.address?.upozila || "",
        zila: user?.address?.zila || "",
      },
      paymentMethod: "COD",
    },
  });

  const onSubmit = async (data) => {
    try {
      const orderData = {
        user: user?._id || null,
        item: cartItems.map((i) => ({
          product: i._id,
          quantity: i.qty,
          price: i.discountPrice || i.price,
          images: i.images,
          sizes: i.sizes,
        })),
        address: data.address,
        paymentMethod: data.paymentMethod,
        paymentStatus: "Pending",
      };

      const result = await createOrder(orderData).unwrap();
      console.log(result);
      // Save order info to redux for guest checkout
      if (result?.data?.address) {
        dispatch(
          setOrderInfo({
            name: result?.data?.address?.name,
            phone: result?.data?.address?.phone,
            upozila: result?.data?.address?.upozila,
            zila: result?.data?.address?.zila,
          })
        );
      }

      result.success &&
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
    <div className="max-w-7xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold text-text py-10 text-center md:text-left">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Shipping Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded shadow p-6 flex flex-col space-y-4"
        >
          <h2 className="text-xl font-semibold text-text">
            Shipping Information
          </h2>

          {/* Name */}
          <input
            {...register("address.name", { required: "Name is required" })}
            placeholder="Full Name"
            className={inputClass}
          />
          {errors?.address?.name && (
            <p className="text-red-500 text-sm">
              {errors.address.name.message}
            </p>
          )}

          {/* Phone */}
          <input
            {...register("address.phone", {
              required: "Phone number is required",
              pattern: {
                value: /^(01[3-9]\d{8})$/,
                message: "Please enter a valid Bangladeshi phone number",
              },
            })}
            placeholder="Phone Number"
            className={inputClass}
            type="tel"
          />
          {errors?.address?.phone && (
            <p className="text-red-500 text-sm">
              {errors.address.phone.message}
            </p>
          )}

          {/* Upozila */}
          <input
            {...register("address.upozila", {
              required: "Upozila is required",
            })}
            placeholder="Upozila"
            className={inputClass}
          />
          {errors?.address?.upozila && (
            <p className="text-red-500 text-sm">
              {errors.address.upozila.message}
            </p>
          )}

          {/* Zila */}
          <input
            {...register("address.zila", { required: "Zila is required" })}
            placeholder="Zila"
            className={inputClass}
          />
          {errors?.address?.zila && (
            <p className="text-red-500 text-sm">
              {errors.address.zila.message}
            </p>
          )}

          {/* Payment Method */}
          <h3 className="text-xl font-semibold mt-4 text-text">
            Payment Method
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* COD */}
            <label className="flex gap-1 p-2 bg-gray-100 items-center border border-gray-400 rounded cursor-pointer hover:shadow-md transition">
              <input
                type="radio"
                value="COD"
                {...register("paymentMethod")}
                defaultChecked
              />
              <img src={cash} className="w-8 h-8" alt="COD" />
              <span className="text-gray-700 text-sm">COD</span>
            </label>

            {/* Bkash */}
            <label className="flex gap-1 p-2 bg-gray-100 items-center border border-gray-400 rounded cursor-pointer hover:shadow-md transition">
              <input
                type="radio"
                value="Bkash"
                {...register("paymentMethod")}
              />
              <img src={bkash} className="w-8 h-8" alt="Bkash" />
              <span className="text-gray-700 text-sm">Bkash</span>
            </label>

            {/* Nagad */}
            <label className="flex gap-1 p-2 bg-gray-100 items-center border border-gray-400 rounded cursor-pointer hover:shadow-md transition">
              <input
                type="radio"
                value="Nagad"
                {...register("paymentMethod")}
              />
              <img src={nagad} className="w-7 h-7" alt="Nagad" />
              <span className="text-gray-700 text-sm">Nagad</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 font-semibold mt-4 hover:bg-primary/90 transition"
          >
            Confirm Order
          </button>
        </form>

        {/* Cart Summary */}
        <div className="bg-white rounded shadow p-6 flex flex-col sticky top-5 space-y-4">
          <h2 className="text-xl font-semibold text-text">Review your cart</h2>

          <div className="flex-1 space-y-4 max-h-[500px] overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4">
                <img
                  src={item.images}
                  alt={item.name}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-text font-semibold">{item.name}</h3>
                  <p className="text-gray-500">{item.qty}x</p>
                </div>
                <p className="text-text font-semibold">
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

            <p className="flex justify-between font-semibold text-text text-lg border-t pt-2">
              Total <span>৳{Math.ceil(totalPrice + 130)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
