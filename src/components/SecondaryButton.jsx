import React from "react";

const SecondaryButton = ({ text, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full lg:w-auto text-center px-3 sm:px-4 md:px-6 py-2 border  text-primary rounded font-semibold border-primary    cursor-pointer"
    >
      {text}
    </div>
  );
};

export default SecondaryButton;
