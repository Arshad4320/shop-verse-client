import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";

import { toast } from "react-toastify";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/productApi";
import { useGetCategoryQuery } from "../../redux/features/category/categoryApi";
const EditProduct = () => {
  const { id } = useParams();
  const [updateProduct] = useUpdateProductMutation();
  const { data: categories } = useGetCategoryQuery();

  const { data } = useGetSingleProductQuery(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (data?.data) {
      reset({
        name: data?.data.name,
        price: data?.data.price,
        quantity: data?.data.quantity,
        description: data?.data.description,
        categoryId: data?.data.categoryId._id,
        image: data?.data.image,
      });
    }
  }, [data, reset]);
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);
      formData.append("description", data.description);
      formData.append("categoryId", data.categoryId);
      if (data?.image && data.image[0]) formData.append("image", data.image[0]);
      const result = await updateProduct({ id, data: formData }).unwrap();
      console.log(result);
      toast.success(result.message);
      console.log(result);
      reset();
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
          Edit Product
        </h2>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Category
          </label>
          <select {...register("categoryId")} className={inputClass}>
            <option value="">Select a category</option>
            {categories?.data?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Name */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Name</label>
          <input
            {...register("name")}
            className={inputClass}
            placeholder="Enter product name"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Price
          </label>
          <input
            type="number"
            {...register("price")}
            className={inputClass}
            placeholder="Enter price"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            {...register("quantity")}
            className={inputClass}
            placeholder="Enter quantity"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1 text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            className={inputClass + " h-24 resize-none"}
            placeholder="Enter product description"
          />
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1 text-gray-700">
            Image
          </label>
          <input type="file" {...register("image")} className={inputClass} />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full md:col-span-2 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all"
        >
          Edit Product
        </button>

        {/* Product List Link */}
        <p className="text-center mt-4 text-sm text-gray-600 md:col-span-2">
          View all Products?{" "}
          <Link
            to="/dashboard/products"
            className="font-semibold underline text-primary"
          >
            Product List
          </Link>
        </p>
      </form>
    </div>
  );
};

export default EditProduct;
