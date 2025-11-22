import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Button from "./Button";
import SecondaryButton from "./SecondaryButton";

const ProductCard = ({ product }) => {
  const { name, description, price, image, quantity } = product;

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer    duration-300 h-[420px] md:h-[450px] flex flex-col">
      {/* Image */}
      <div className="w-full h-56 md:h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 ">
        <h3 className="text-sm font-bold text-text text-center">{name}</h3>

        {/* Price & Quantity */}

        <span className="flex gap-1 justify-center space-y-2 items-center text-text hover hover:text-primary font-bold">
          <FaBangladeshiTakaSign /> {price}
        </span>

        {/* Buttons */}
        <div className="mt-2   space-y-2">
          <Button text={"Details"} />
          <SecondaryButton text={"Add To Cart"} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
