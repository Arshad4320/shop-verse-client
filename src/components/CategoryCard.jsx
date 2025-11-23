import React from "react";
import Button from "./Button";
import { Link } from "react-router";

const CategoryCard = ({ item }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
      {/* Image */}
      <img
        src={item?.image}
        alt={item?.name}
        className="w-full h-56 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>

      {/* Center Name on Image */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <h3 className="text-white text-2xl font-bold drop-shadow-lg">
          {item?.name}
        </h3>
      </div>

      {/* Hover Button */}
      <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <Link to={`/category/details/${item?._id}`}>
          {" "}
          <Button text={"View Collection"} />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
