import React from "react";

const Heading = ({ text, className }) => {
  return (
    <h1 className="text-center text-2xl text-text sm:text-3xl md:text-4xl mt-10 mb-6 font-bold">
      {text}
    </h1>
  );
};

export default Heading;
