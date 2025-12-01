import React from "react";
import { useGetProductQuery } from "../../redux/features/product/productApi";

import ProductCard from "../ProductCard";
import Heading from "../Heading";

const WomenFashion = () => {
  const { data } = useGetProductQuery();
  const filteredData = data?.data?.filter(
    (product) => product?.categoryId?.name === "Women’s Fashion"
  );
  return (
    <div className="max-w-7xl w-full mx-auto ">
      {filteredData?.length > 0 && (
        <>
          <Heading text={"Women’s Fashion"} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mt-6">
            {filteredData?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WomenFashion;
