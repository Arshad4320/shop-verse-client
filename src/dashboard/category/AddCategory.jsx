import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useCreateCategoryMutation } from "../../redux/features/category/categoryApi";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [createCategory, { isLoading, isSuccess, isError }] =
    useCreateCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const result = await createCategory(formData).unwrap();

      toast.success(result.message);
      reset();
    } catch (err) {
      console.log(err.message);
      toast.error(err?.message || "Failed to create category");
    }
  };

  const inputClass =
    "w-full border border-primary p-2 rounded transition-all focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none text-text";

  return (
    <div className="min-h-screen flex justify-center items-start bg-bg px-4 pt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card shadow-lg rounded-xl p-6 w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Add Category
        </h2>

        {/* Product Name */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Name*
          </label>
          <input
            {...register("name", { required: "category name is required" })}
            className={inputClass}
            placeholder="Enter category name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Description*
          </label>
          <input
            {...register("description", {
              required: "category description is required",
            })}
            className={inputClass}
            placeholder="Enter category name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-text">Image*</label>
          <input
            {...register("image", { required: "category image is required" })}
            className={inputClass}
            type="file"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all"
        >
          Add Category
        </button>

        <p className="text-center mt-4 text-sm text-text">
          View all categories?{" "}
          <Link
            to="/dashboard/category"
            className=" font-semibold underline text-primary"
          >
            Category List
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AddCategory;
