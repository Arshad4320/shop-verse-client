import React from "react";

const SecondaryButton = ({ text }) => {
  return (
    <div className="w-full lg:w-auto text-center px-3 sm:px-4 md:px-6 py-3 border  bg-secondary text-white rounded-lg font-semibold hover:bg-primary hover:border-primary hover:text-white transition  cursor-pointer">
      {text}
    </div>
  );
};

export default SecondaryButton;
