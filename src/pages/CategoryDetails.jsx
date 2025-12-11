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
    <div className="max-w-7xl mx-auto py-8 px-4">
      {!filteredData || filteredData.length === 0 ? (
        <>
          <div className="flex flex-col justify-center items-center py-32 text-center">
            {" "}
            <h2 className="text-xl text-primary font-medium  uppercase ">
              Products not found! This category is empty.{" "}
              <Link to="/" className="underline">
                Back to home
              </Link>
            </h2>
          </div>{" "}
          {/* <p className="flex items-center uppercase py-32 justify-center  text-primary text-xl sm:text-xl md:text-3xl font-medium">
            <Link className="underline" to="/">
              Products not found! This category is empty. Back to home
            </Link>
          </p> */}
        </>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mx-6 lg:mx-0">
          {filteredData.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
