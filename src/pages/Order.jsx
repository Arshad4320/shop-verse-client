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
      toast.success(result.message || "Order created successfully");
      dispatch(clearCart());
      navigate("/success");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Cart Summary */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Your Items</h2>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 p-3 ">
                <img
                  src={item.image}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Qty: {item.qty}</p>
                  <p>Price: ৳ {Math.ceil(item.discountPrice || item.price)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Totals */}
          <div className="mt-4 border-t pt-2 font-semibold text-lg flex justify-between">
            <p>Total Quantity: {totalQty}</p>
            <p>Total Price: ৳ {Math.ceil(totalPrice)}</p>
          </div>
        </div>

        {/* Right Side - Checkout Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 rounded-xl shadow flex flex-col"
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
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold mt-auto"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
