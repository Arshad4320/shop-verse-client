import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import {
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "../../redux/features/category/categoryApi";
import { toast } from "react-toastify";

const EditCategory = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleCategoryQuery(id);
  const [updateCategory] = useUpdateCategoryMutation();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name,
        description: data.data.description,
        image: data.data.image,
      });
    }
  }, [data, reset]);

  const onSubmit = async (form) => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);

    if (form.image && form.image[0]) {
      formData.append("image", form.image[0]);
    }

    try {
      const result = await updateCategory({ id, data: formData }).unwrap();
      toast.success(result.message);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update category");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  const inputClass =
    "w-full border border-accent p-2 rounded transition-all focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none text-text";

  return (
    <div className="min-h-screen flex justify-center items-start bg-bg px-4 pt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card shadow-lg rounded-xl p-6 w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Update Category
        </h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1 text-text">Name</label>
          <input
            {...register("name")}
            className={inputClass}
            placeholder="Enter category name"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-text">
            Description
          </label>
          <input
            {...register("description")}
            className={inputClass}
            placeholder="Enter category description"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1 text-text">Image</label>
          <input {...register("image")} className={inputClass} type="file" />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all"
        >
          Update Category
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

export default EditCategory;
