import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Button from "./Button";
import SecondaryButton from "./SecondaryButton";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { name, description, price, image, quantity, _id } = product;

  return (
    <div className="bg-white shadow rounded-md overflow-hidden cursor-pointer    duration-300 h-[400px] flex flex-col">
      {/* Image */}
      <div className="w-full h-52 md:h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 ">
        <div className="h-15">
          <h3 className="text-sm font-bold text-text text-center">{name}</h3>

          <span className="flex gap-1 justify-center space-y-2 items-center text-text hover hover:text-primary font-bold">
            <FaBangladeshiTakaSign /> {price}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-2 space-y-2">
          <Link to={`/product/details/${_id}`} className="block">
            <Button text="Details" />
          </Link>

          <SecondaryButton text="Add To Cart" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
