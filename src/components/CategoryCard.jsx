import React from "react";
import Button from "./Button";
import { Link } from "react-router";

const CategoryCard = ({ item }) => {
  return (
    <div className="   cursor-pointer">
      <Link className="" to={`/category/details/${item?._id}`}>
        <img
          src={item?.image}
          alt={item?.name}
          className=" object-cover w-full h-32  "
        />
        <h3 className="text-gray-700 text-md font-medium mt-2 text-center md:font-semibold ">
          {item?.name}
        </h3>
      </Link>
    </div>
  );
};

export default CategoryCard;
