import React, { useState } from "react";
import { Link, useParams } from "react-router";
import {
  useGetProductQuery,
  useGetSingleProductQuery,
} from "../redux/features/product/productApi";
import Button from "../components/Button";
import { useGetCategoryQuery } from "../redux/features/category/categoryApi";
import CategoryCard from "../components/CategoryCard";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const { data: category } = useGetCategoryQuery();
  const { data: products } = useGetProductQuery();
  const filteredData = products?.data?.filter((item) => item._id !== id);
  const filterCategory = category?.data?.filter(
    (item) => item._id !== data?.data.categoryId._id
  );

  const [qty, setQty] = useState(1);

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-20 text-red-500">Something went wrong!</p>
    );

  const product = data?.data;
  console.log(product);
  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* ================= Left Main Section ================= */}
      <div className="lg:col-span-9">
        {/* Product Image + Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.name}
              className="rounded-lg shadow-lg w-full h-[400px]"
            />
            {product?.discount > 0 && (
              <span className="absolute top-3 left-3 bg-success text-white px-3 py-1 rounded-md text-sm">
                -{product?.discount}% OFF
              </span>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-3">{product?.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              {!product?.discountPrice ? (
                <p className="text-xl text-primary">৳ {product?.price}</p>
              ) : (
                <>
                  <p className="line-through text-gray-400 text-xl">
                    ৳ {product?.price}
                  </p>
                  <p className="text-xl font-semibold text-primary">
                    ৳ {product?.discountPrice}
                  </p>
                </>
              )}

              {product?.discount > 0 && (
                <p className="text-success font-medium">
                  ৳ {product?.discount}% Off
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 mt-5">
              <button
                className="px-3 py-1 bg-gray-200 rounded"
                onClick={() => qty > 1 && setQty(qty - 1)}
              >
                –
              </button>
              <span className="text-xl">{qty}</span>
              <button
                className="px-3 py-1 bg-gray-200 rounded"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>

            {/* Extra Product Info */}
            <div className="mt-6 space-y-2">
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {product?.categoryId?.name}
              </p>
              <p>
                <span className="font-semibold">Brand:</span> {product?.brand}
              </p>
              <p>
                <span className="font-semibold">Tags:</span> {product?.tags}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <Button text={"Add To Cart"} />
              <button className="px-6 py-1 bg-success text-white rounded hover:bg-green-700">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* ================= Product Description ================= */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">
          Product Description
        </h2>
        <p className="text-gray-700 leading-relaxed">{product?.description}</p>

        {/* ================= Category Section Below ================= */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Browse More Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
          {filterCategory?.map((item) => (
            <CategoryCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* ================= Right Sidebar ================= */}
      <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-4 h-fit">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>

        {filteredData?.map((item) => (
          <Link key={item._id} to={`/product/details/${item._id}`}>
            <div className="flex gap-3 mb-4 border-b pb-4">
              <img
                src={item?.image}
                className="w-20 h-20 object-cover rounded"
                alt=""
              />
              <div>
                <p className="font-medium">{item?.name}</p>
                <p className="text-primary">৳ {item?.price}</p>
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
