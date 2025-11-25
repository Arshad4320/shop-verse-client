import React from "react";

const Heading = ({ text, className }) => {
  return (
    <div className="relative">
      <h1 className="text-center text-2xl text-text sm:text-3xl md:text-4xl my-10 font-bold">
        {text}
      </h1>
    </div>
  );
};

export default Heading;
