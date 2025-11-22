import React from "react";
import Heading from "./Heading";
import { useGetCategoryQuery } from "../redux/features/category/categoryApi";
import Button from "./Button";
import { Link } from "react-router";

const CategoryCard = () => {
  const { data } = useGetCategoryQuery();

  return (
    <div className="py-10">
      <Heading text={"Categories"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-6 lg:mx-0 mt-6">
        {data?.data?.map((item) => (
          <div
            key={item._id}
            className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>

            {/* Center Name on Image */}
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <h3 className="text-white text-2xl font-bold drop-shadow-lg">
                {item.name}
              </h3>
            </div>

            {/* Hover Button */}
            <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Link to={`/category/details/${item._id}`}>
                {" "}
                <Button text={"View Collection"} />
              </Link>
            </div>

            {/* Bottom Name (Optional Extra Title) */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
