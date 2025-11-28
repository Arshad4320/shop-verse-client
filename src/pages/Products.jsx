import React, { useEffect, useState } from "react";
import { useQueryProductsQuery } from "../redux/features/product/productApi";
import Heading from "../components/Heading";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
  const { data } = useQueryProductsQuery({ search, page, limit: 8 });

  const products = data?.data?.result || [];
  const totalPage = data?.data?.meta?.totalPage || 1;

  return (
    <div className="w-7xl mx-auto">
      <Heading text={"Products"} />

      {/* Search Box */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search your favorite product or category or brand"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full border border-primary p-2 rounded transition-all focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 my-8 f">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className=" disabled:opacity-50 font-semibold bg-primary text-white px-3 py-1"
        >
          Prev
        </button>

        <span className="font-semibold bg-primary text-white px-3 py-1">
          {page}
        </span>

        <button
          disabled={page === totalPage}
          onClick={() => setPage((p) => p + 1)}
          className=" disabled:opacity-50 font-semibold bg-primary text-white px-3 py-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
