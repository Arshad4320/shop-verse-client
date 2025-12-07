import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  useGetProductQuery,
  useGetSingleProductQuery,
} from "../redux/features/product/productApi";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import { useGetCategoryQuery } from "../redux/features/category/categoryApi";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "./../components/ProductCard";
import { addToCart } from "../redux/features/cart/cart";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const { data: category } = useGetCategoryQuery();
  const { data: products } = useGetProductQuery();
  const { cartItems } = useSelector((state) => state.cart);

  const product = data?.data;
  // console.log(product.sizes);
  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState("S");

  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setMainImage(product.image || product.images?.[0] || "");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [product]);

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-20 text-red-500">Something went wrong!</p>
    );

  const filteredData = products?.data?.filter(
    (item) =>
      item?._id !== id && item?.categoryId?._id === product?.categoryId._id
  );

  const filterCategory = category?.data?.filter(
    (item) => item?._id !== product?.categoryId?._id
  );

  const handleAddToCart = () => {
    const cartItem = {
      _id: product?._id,
      name: product?.name,
      price: product?.price,
      discountPrice: product?.discountPrice,
      images: mainImage,
      qty: qty,
      sizes: size,
    };
    dispatch(addToCart(cartItem));
  };

  const handleCheckout = () => {
    const existingItem = cartItems.find((item) => item._id === product?._id);
    if (!existingItem) {
      const cartItem = {
        _id: product?._id,
        name: product?.name,
        price: product?.price,
        discountPrice: product?.discountPrice,
        images: mainImage,
        qty: qty,
        sizes: size,
      };
      dispatch(addToCart(cartItem));
    }
    navigate("/order");
  };

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Section */}
      <div className="lg:col-span-9">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            {/* Main Image */}
            <div className="mb-4">
              <img
                src={mainImage}
                alt={product?.name}
                className="w-full h-[300px] sm:h-[330px] md:h-[350px] object-cover rounded-lg"
              />
            </div>

            <div className="flex ">
              {product.images
                .filter((img) => img !== mainImage || [])
                .map((img, i) => (
                  <img
                    className={`w-20 h-20 mr-2.5 sm:w-[110px] sm:h-[110] object-cover rounded cursor-pointer border ${
                      mainImage === img ? "border-primary" : "border-gray-300"
                    } transition-transform duration-200 hover:scale-105`}
                    src={img}
                    key={i}
                    onClick={() => setMainImage(img)}
                  />
                ))}
            </div>
            {/* Discount Badge */}
            {product?.discount > 0 && (
              <span className="absolute top-3 left-3 bg-success text-white px-3 py-1 rounded-md text-sm">
                -{product?.discount}% OFF
              </span>
            )}
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">
              {product?.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              {!product?.discountPrice ? (
                <p className="text-3xl text-primary font-semibold">
                  ৳ {Math.ceil(product?.price)}
                </p>
              ) : (
                <>
                  <p className="text-3xl font-semibold text-primary">
                    ৳ {Math.ceil(product?.discountPrice)}
                  </p>
                  <p className="line-through text-gray-400 text-xl">
                    ৳ {Math.ceil(product?.price)}
                  </p>
                  <p className="text-success font-medium">
                    -{product?.discount}% Off
                  </p>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mt-5">
              <button
                className="px-2 bg-gray-200 text-md border border-primary "
                onClick={() => qty > 1 && setQty(qty - 1)}
              >
                –
              </button>
              <span className="text-xl">{qty}</span>
              <button
                className="px-2  bg-gray-200 text-md  border border-primary"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>

            {/* Product Info */}
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
              <span className="flex mt-3 gap-2">
                {product?.sizes.map((s, i) => (
                  <span
                    className={`border  text-md px-2 cursor-pointer ${
                      size === s && "border-2 border-primary  bg-gray-300"
                    }`}
                    onClick={() => setSize(s)}
                    key={i}
                  >
                    {s}
                  </span>
                ))}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-2 mt-4">
              <Button onClick={handleAddToCart} text="Add To Cart" />
              <button
                onClick={handleCheckout}
                className=" w-full  text-[12px] sm:text-sm md:text-md flex items-center justify-center px-3 sm:px-4 md:px-6 py-2  md:py-2.5 bg-success  text-white  font-semibold cursor-pointer   hover:bg-green-700 gap-2 "
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">
          Product Description
        </h2>
        <p className="text-gray-700 leading-relaxed">{product?.description}</p>

        {/* Related Products */}
        {filteredData?.length > 0 && (
          <>
            <h2 className="text-xl font-semibold my-4">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mt-6">
              {filteredData.map((item) => (
                <Link key={item._id} to={`/product/details/${item._id}`}>
                  <ProductCard product={item} />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="lg:col-span-3 bg-white rounded py-2 h-fit">
        <p className="text-xl font-bold mb-4">Browse More Categories</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 mt-4">
          {filterCategory?.map((item) => (
            <CategoryCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
