import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Button from "./Button";
import SecondaryButton from "./SecondaryButton";

const ProductCard = ({ product }) => {
  const { name, description, price, image, quantity } = product;

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer    duration-300 h-[420px] md:h-[480px] flex flex-col">
      {/* Image */}
      <div className="w-full h-56 md:h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-md font-bold text-text">{name}</h3>
        <p className="text-md text-gray-500 mt-1 line-clamp-3 md:line-clamp-4 flex-1">
          {description}
        </p>

        {/* Price & Quantity */}
        <div className="flex justify-between mt-4">
          <span className="flex gap-1 items-center text-success font-semibold">
            <FaBangladeshiTakaSign /> {price}
          </span>
          <span className="flex gap-1 items-center text-warning font-medium">
            <MdOutlineProductionQuantityLimits className="text-lg" /> {quantity}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-3 flex-col lg:flex-row md:justify-center items-center">
          <Button text={"Details"} />
          <SecondaryButton text={"Add To Cart"} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
