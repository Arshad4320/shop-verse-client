import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useGetProductQuery,
} from "../../redux/features/product/productApi";
import { useGetCategoryQuery } from "../../redux/features/category/categoryApi";
const AddProduct = () => {
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useGetCategoryQuery();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);
      formData.append("discount", data.discount);
      formData.append("tags", data.tags);
      formData.append("brand", data.brand);
      formData.append("description", data.description);
      formData.append("categoryId", data.categoryId);
      if (data?.image && data.image[0]) formData.append("image", data.image[0]);
      const result = await createProduct(formData).unwrap();
      toast.success(result.message);
      console.log(result);
      // reset();
    } catch (err) {
      console.log(err);
      toast.error(err.message || "failed to create product");
    }
  };

  const inputClass =
    "w-full border border-accent p-2 rounded transition-all focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none text-text";

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50  ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 w-full  grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <h2 className="text-3xl font-bold text-center mb-3 text-primary col-span-1 md:col-span-2">
          Add Product
        </h2>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Category*
          </label>
          <select
            {...register("categoryId", { required: "Category is required" })}
            className={inputClass}
          >
            <option value="">Select a category</option>
            {categories?.data?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        {/* Product Name */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Name*
          </label>
          <input
            {...register("name", { required: "Product name is required" })}
            className={inputClass}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Price*
          </label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className={inputClass}
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
        {/* Price */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Discount
          </label>
          <input
            type="number"
            {...register("discount")}
            className={inputClass}
            placeholder="Enter discount"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Quantity*
          </label>
          <input
            type="number"
            {...register("quantity", { required: "Quantity is required" })}
            className={inputClass}
            placeholder="Enter quantity"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>
        {/* Tags */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Tags*
          </label>
          <input
            type="string"
            {...register("tags", { required: "tags is required" })}
            className={inputClass}
            placeholder="Enter tags"
          />
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
          )}
        </div>
        {/* Brand */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Brand*
          </label>
          <input
            type="text"
            {...register("brand", { required: "brand is required" })}
            className={inputClass}
            placeholder="Enter brand"
          />
          {errors.brand && (
            <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
          )}
        </div>
        {/* Image */}
        <div className="">
          <label className="block font-semibold mb-1 text-gray-700">
            Image*
          </label>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className={inputClass}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>
        {/* Description */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1 text-gray-700">
            Description*
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className={inputClass + " h-24 resize-none"}
            placeholder="Enter product description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full md:col-span-2 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-purple-700y transition-all"
        >
          Add Product
        </button>

        {/* Product List Link */}
        <p className="text-center mt-4 text-sm text-gray-600 md:col-span-2">
          View all Products?{" "}
          <Link
            to="/dashboard/products"
            className=" font-semibold underline text-primary"
          >
            Product List
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AddProduct;
