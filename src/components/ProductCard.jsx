import React, { useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Button from "./Button";
import SecondaryButton from "./SecondaryButton";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cart/cart";

const ProductCard = ({ product }) => {
  // console.log(product);
  const { name, discount, price, images, _id, discountPrice, sizes } = product;

  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    const cartItem = {
      _id: product?._id,
      name: product?.name,
      price: product?.price,
      discountPrice: product?.discountPrice,
      images: images[0],
      qty: 1,
      sizes: sizes[0],
    };
    dispatch(addToCart(cartItem));
  };
  // console.log(handleAddToCart());
  const handleCheckout = () => {
    const existingItem = cartItems.find((item) => item._id === product?._id);

    if (!existingItem) {
      const cartItem = {
        _id: product?._id,
        name: product?.name,
        price: product?.price,
        discountPrice: product?.discountPrice,
        images: images[0],
        qty: 1,
        sizes: sizes[0],
      };
      dispatch(addToCart(cartItem));
    }
    navigate("/order");
  };

  return (
    <div className="bg-white shadow rounded-md overflow-hidden cursor-pointer relative duration-300 h-[335px] md:h-[410px] flex flex-col">
      {/* Image */}
      <Link className="flex-1" to={`/product/details/${_id}`}>
        <div className="w-full h-42 md:h-56 overflow-hidden">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {discount > 0 && (
          <div className="bg-success absolute w-10 left-2  top-2 h-10 rounded-full flex items-center justify-center text-white text-[13px] md:text-[15px] font-semibold gap-1">
            -{discount}%
          </div>
        )}

        {/* content */}
        <div className="p-2">
          <h3 className="  text-[13px] md:text-[15px] font-semibold md:font-bold text-text text-center mb-1">
            {name}
          </h3>

          <div className="flex gap-2 justify-center items-center">
            <span
              className={`${
                discountPrice > 0 && discount > 0
                  ? "line-through text-text flex gap-1 items-center"
                  : "flex gap-1 items-center text-success text-[14px] md:text-[15px] font-bold"
              }`}
            >
              ৳ {discountPrice ? discountPrice : Math.ceil(price)}
            </span>

            {discountPrice > 0 && discount > 0 && (
              <span className="flex gap-1 items-center text-success  text-[14px] md:text-[15px] font-bold">
                ৳ {Math.ceil(discountPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Bottom Buttons */}
      <div className="p-2 md:p-4 pt-0 flex flex-col gap-2">
        <Button onClick={handleCheckout} text="Buy Now" />

        <SecondaryButton onClick={handleAddToCart} text="Add To Cart" />
      </div>
    </div>
  );
};

export default ProductCard;
