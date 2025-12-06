import React from "react";
import { LuShoppingBag } from "react-icons/lu";
const Button = ({ text, onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" w-full  text-[12px] sm:text-sm md:text-md flex items-center justify-center px-3 sm:px-4 md:px-6 py-2  md:py-2.5 bg-primary  text-white  font-semibold cursor-pointer   hover:bg-purple-700 gap-2 "
    >
      <LuShoppingBag size={17} />
      {text}
    </div>
  );
};

export default Button;
