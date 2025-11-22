import React from "react";

const Heading = ({ text, className }) => {
  return (
    <h1 className="text-center text-3xl text-primary sm:text-4xl md:text-5xl my-6 font-medium">
      {text}
    </h1>
  );
};

export default Heading;
