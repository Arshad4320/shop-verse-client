import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const SecondaryButton = ({ text, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full lg:w-auto text-center text-[12px] sm:text-sm md:text-md px-3 sm:px-4 md:px-6 py-1 sm:py-2 border  text-primary  font-semibold border-primary    cursor-pointer flex items-center justify-center gap-2"
    >
      <FiShoppingCart className="text-primary" size={17} />
      {text}
    </div>
  );
};

export default SecondaryButton;
