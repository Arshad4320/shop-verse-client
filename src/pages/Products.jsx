import React from "react";
import { useGetProductQuery } from "../redux/features/product/productApi";
import Heading from "../components/Heading";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { data } = useGetProductQuery();

  return (
    <div className="w-7xl mx-auto">
      <Heading text={"Products"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  lg:mx-0 mt-6">
        {data?.data?.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
