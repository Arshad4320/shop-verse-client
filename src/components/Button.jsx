import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" w-full lg:w-auto  flex items-center justify-center px-3 sm:px-4 md:px-6 py-2 bg-primary  text-white rounded font-semibold cursor-pointer   hover:bg-purple-700"
    >
      {text}
    </div>
  );
};

export default Button;
