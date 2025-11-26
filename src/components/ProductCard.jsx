import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Button from "./Button";
import SecondaryButton from "./SecondaryButton";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cart/cart";
const ProductCard = ({ product }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    const cartItem = {
      _id: product?._id,
      name: product?.name,
      price: product?.price,
      discountPrice: product?.discountPrice,
      image: product?.image,
      qty: 1,
    };
    dispatch(addToCart(cartItem));
  };
  const handleCheckout = () => {
    const existingItem = cartItems.find((item) => item._id === product?._id);

    if (!existingItem) {
      const cartItem = {
        _id: product?._id,
        name: product?.name,
        price: product?.price,
        discountPrice: product?.discountPrice,
        image: product?.image,
        qty: 1,
      };
      dispatch(addToCart(cartItem));
    }
    navigate("/order");
  };
  const { name, discount, price, image, _id, discountPrice } = product;

  return (
    <div className="bg-white shadow rounded-md overflow-hidden cursor-pointer relative duration-300 h-[420px] flex flex-col">
      {/* Image */}
      <Link to={`/product/details/${_id}`} className="flex-1">
        <div className="w-full h-56 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {discount > 0 && (
          <div className="bg-success absolute w-10 left-2 top-2 h-10 rounded-full flex items-center justify-center text-white font-semibold">
            {discount}%
          </div>
        )}

        {/* Content */}
        <div className="p-3">
          <h3 className="text-sm font-bold text-text text-center mb-2">
            {name}
          </h3>

          <div className="flex gap-2 justify-center items-center">
            <span
              className={`${
                discountPrice > 0 && discount > 0
                  ? "line-through text-text flex gap-1 items-center"
                  : "flex gap-1 items-center text-success font-bold"
              }`}
            >
              <FaBangladeshiTakaSign /> {price}
            </span>

            {discountPrice > 0 && (
              <span className="flex gap-1 items-center text-success font-bold">
                <FaBangladeshiTakaSign /> {discountPrice}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Bottom Buttons */}
      <div className="p-4 pt-0 flex flex-col gap-2">
        <Button onClick={handleCheckout} text="Buy Now" />
        <SecondaryButton onClick={handleAddToCart} text="Add To Cart" />
      </div>
    </div>
  );
};

export default ProductCard;
