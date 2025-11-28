import React, { useState } from "react";
import { useGetProductQuery } from "../redux/features/product/productApi";
import Heading from "../components/Heading";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data } = useGetProductQuery({ search, page, limit: 8 });

  const products = data?.data?.result || [];
  const totalPage = data?.meta?.totalPage || 1;

  return (
    <div className="w-7xl mx-auto">
      <Heading text={"Products"} />

      {/* Search Box */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border px-4 py-2 w-full rounded-md"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 my-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {page} of {totalPage}
        </span>

        <button
          disabled={page === totalPage}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
