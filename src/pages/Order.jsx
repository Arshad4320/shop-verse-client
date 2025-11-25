import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCreateOrderMutation } from "../redux/features/order/order";
import { toast } from "react-toastify";
import { clearCart } from "../redux/features/cart/cart";

const OrderPage = () => {
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { cartItems, totalPrice, totalQty } = useSelector(
    (state) => state.cart
  );

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      address: {
        name: user?.name || "",
        phone: user?.address?.phone || "",
        upozilla: user?.address?.upozilla || "",
        city: user?.address?.city || "",
      },
      paymentMethod: "COD",
      paymentStatus: "Pending",
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
      console.log(result);
      toast.success(result.message || "order created successfully");
      dispatch(clearCart());
      navigate("/success");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Summary */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Your Items</h2>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 p-3 border-b"
            >
              <img
                src={item.image}
                className="w-20 h-20 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p>Qty: {item.qty}</p>
                <p>Price: ৳ {item.discountPrice || item.price}</p>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-4 font-semibold text-lg">
            <p>Total Quantity: {totalQty}</p>
            <p>Total Price: ৳ {totalPrice}</p>
          </div>
        </div>

        {/* Checkout Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 rounded-xl shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

          <input
            {...register("address.name")}
            placeholder="Full Name"
            className="w-full border p-2 rounded mb-3"
          />

          <input
            {...register("address.phone")}
            placeholder="Phone"
            className="w-full border p-2 rounded mb-3"
          />

          <input
            {...register("address.upozilla")}
            placeholder="Upozilla"
            className="w-full border p-2 rounded mb-3"
          />

          <input
            {...register("address.city")}
            placeholder="City"
            className="w-full border p-2 rounded mb-4"
          />

          <h2 className="text-xl font-semibold mb-2">Payment Method</h2>

          <select
            {...register("paymentMethod")}
            className="w-full border p-2 rounded mb-4"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Bkash">Bkash</option>
            <option value="Nagad">Nagad</option>
            <option value="Card">Card</option>
          </select>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
