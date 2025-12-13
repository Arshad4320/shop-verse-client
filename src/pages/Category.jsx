import React from "react";
import { useGetCategoryQuery } from "../redux/features/category/categoryApi";
import Heading from "../components/Heading";
import CategoryCard from "../components/CategoryCard";
import { Loader } from "../components/Loader";

const Category = () => {
  const { data, isLoading } = useGetCategoryQuery();

  if (isLoading) return <Loader />;
  return (
    <div className="py-6">
      {data?.data?.length > 0 && (
        <>
          <Heading text={"Categories"} />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4  mt-6">
            {data?.data?.map((item) => (
              <CategoryCard key={item._id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
