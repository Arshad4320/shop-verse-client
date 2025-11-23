import React from "react";
import Heading from "./Heading";
import { useGetProductQuery } from "../redux/features/product/productApi";
import ProductCard from "./ProductCard";

const Products = () => {
  const { data } = useGetProductQuery();

  return (
    <div className="max-w-7xl w-full mx-auto px-4">
      <Heading text="Products" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {data?.data?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
