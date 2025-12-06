import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetSingleProductQuery,
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
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name,
        price: data.data.price,
        quantity: data.data.quantity,
        discount: data.data.discount || 0,
        tags: data.data.tags || "",
        brand: data.data.brand,
        description: data.data.description,
        categoryId: data.data.categoryId._id,
      });
      // Set sizes
      if (data.data.size) setValue("sizes", data.data.size);
    }
  }, [data, reset, setValue]);

  const onSubmit = async (formData) => {
    try {
      const formData = new FormData();
      formData.append("name", formData.name);
      formData.append("price", formData.price);
      formData.append("quantity", formData.quantity);
      formData.append("discount", formData.discount || "0");
      formData.append("tags", formData.tags || "");
      formData.append("brand", formData.brand);
      formData.append("description", formData.description);
      formData.append("categoryId", formData.categoryId);

      if (formData.images && formData.images.length > 0) {
        [...formData.images].forEach((file) => formData.append("images", file));
      }

      if (formData.sizes && formData.sizes.length > 0) {
        formData.sizes.forEach((size) => formData.append("sizes[]", size));
      }

      const result = await updateProduct({ id, data: formData }).unwrap();
      result.success && toast.success(result.message);
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to update product");
    }
  };

  const inputClass =
    "w-full border border-accent p-2 rounded transition-all focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none text-text";

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 w-full grid grid-cols-1 md:grid-cols-2 gap-6"
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
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Name</label>
          <input
            {...register("name", { required: "Product name is required" })}
            className={inputClass}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Price
          </label>
          <input type="number" {...register("price")} className={inputClass} />
        </div>

        {/* Discount */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Discount
          </label>
          <input
            type="number"
            {...register("discount")}
            className={inputClass}
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
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Tags</label>
          <input type="text" {...register("tags")} className={inputClass} />
        </div>

        {/* Brand */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Brand
          </label>
          <input type="text" {...register("brand")} className={inputClass} />
        </div>
        {/* Images */}
        <div className="">
          <label className="block font-semibold mb-1 text-gray-700">
            Images
          </label>
          <input
            type="file"
            multiple
            {...register("images")}
            className={inputClass}
          />
        </div>
        {/* Sizes */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Sizes
          </label>
          <select
            multiple
            {...register("sizes")}
            className={inputClass + " h-24"}
          >
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            className={inputClass + " h-24 resize-none"}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full md:col-span-2 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all"
        >
          Update Product
        </button>

        {/* Product List */}
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
