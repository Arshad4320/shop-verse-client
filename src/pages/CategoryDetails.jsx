import React, { useEffect } from "react";
import { useGetSingleCategoryQuery } from "../redux/features/category/categoryApi";
import { Link, useParams } from "react-router";
import { useGetProductQuery } from "../redux/features/product/productApi";
import ProductCard from "../components/ProductCard";

const CategoryDetails = () => {
  const { id } = useParams();
  const { data: category } = useGetSingleCategoryQuery(id);
  const { data: products } = useGetProductQuery();

  const filteredData = products?.data?.filter(
    (item) => item.categoryId?._id === category?.data?._id
  );
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filteredData]);
  return (
    <div className="max-w-7xl mx-auto py-8">
      {!filteredData || filteredData.length === 0 ? (
        <>
          {" "}
          <p className="flex items-center h-[350px] justify-center  text-primary text-3xl font-bold">
            Products not found! This category is empty.
            <Link className="underline" to="/">
              Back to home
            </Link>
          </p>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-6 lg:mx-0">
          {filteredData.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
