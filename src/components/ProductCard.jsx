import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Button from "./Button";
import SecondaryButton from "./SecondaryButton";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cart";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
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
  const { name, discount, price, image, quantity, _id, discountPrice } =
    product;

  return (
    <div className="bg-white shadow rounded-md overflow-hidden  cursor-pointer  relative  duration-300 h-[400px] flex flex-col">
      {/* Image */}
      <div className="w-full h-52 md:h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      {discount > 0 && (
        <div className="bg-success absolute w-10 left-2 top-1 h-10 rounded-full flex items-center justify-center text-white font-semibold">
          {discount}%
        </div>
      )}
      {/* Content */}
      <div className="p-4 ">
        <div>
          <h3 className="text-sm font-bold text-text text-center">{name}</h3>

          <div className="flex gap-2 justify-center">
            <span
              className={` ${
                discountPrice > 0 && discount > 0
                  ? "line-through text-text flex gap-1 justify-center items-center"
                  : "flex gap-1 justify-center space-y-2 items-center text-success hover:text-primary font-bold"
              }`}
            >
              <FaBangladeshiTakaSign /> {price}
            </span>
            {discountPrice > 0 && (
              <span className="flex gap-1 justify-center space-y-2 items-center text-green  hover:text-primary font-bold text-success">
                <FaBangladeshiTakaSign /> {discountPrice}
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-2 space-y-2">
          <Link to={`/product/details/${_id}`} className="block">
            <Button text="Details" />
          </Link>

          <SecondaryButton onClick={handleAddToCart} text="Add To Cart" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
