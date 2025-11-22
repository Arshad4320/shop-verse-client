import React from "react";
import Heading from "./Heading";
import { useGetProductQuery } from "../redux/features/product/productApi";
import ProductCard from "./ProductCard";

const Products = () => {
  const { data } = useGetProductQuery();
  console.log(data?.data);
  return (
    <div>
      <Heading text={"Products"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-6 lg:mx-0">
        {data?.data?.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
