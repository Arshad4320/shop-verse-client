import React from "react";

const Button = ({ text }) => {
  return (
    //   <div className="w-full md:w-auto px-3 sm:px-4 md:px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-primary hover:text-white transition hover:border-primary"></div>
    <div className=" w-full lg:w-auto text-center px-3 sm:px-4 md:px-6 py-2 bg-primary  text-white rounded-lg font-semibold    hover:bg-purple-700">
      {text}
    </div>
  );
};

export default Button;
