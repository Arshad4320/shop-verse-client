import React from "react";
import { useGetCategoryQuery } from "../redux/features/category/categoryApi";
import Heading from "../components/Heading";
import CategoryCard from "../components/CategoryCard";

const Category = () => {
  const { data } = useGetCategoryQuery();
  return (
    <div className="py-10">
      <Heading text={"Categories"} />

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mx-6 lg:mx-0 mt-6">
        {data?.data?.map((item) => (
          <CategoryCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Category;
