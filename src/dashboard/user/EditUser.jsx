import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";

import { Loader } from "../../components/Loader";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";

const EditUser = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleUserQuery(id);

  const [updateUser] = useUpdateUserMutation();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      userType: data?.data?.userType,
    },
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        userType: data.data.userType,
      });
    }
  }, [data, reset]);

  const onSubmit = async (form) => {
    try {
      const result = await updateUser({
        id,
        data: { userType: form.userType },
      }).unwrap();

      if (result?.success === true) {
        toast.success(result.message || "User type updated successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update user type");
    }
  };

  if (isLoading) return <Loader />;

  const inputClass =
    "w-full border border-accent p-2 rounded transition-all focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none text-text";

  return (
    <div className="min-h-screen flex justify-center items-start bg-bg px-4 pt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card shadow-lg rounded-xl p-6 w-full max-w-xl"
      >
        <h2 className="text-4xl font-bold text-center mb-6 text-primary">
          Change User Type
        </h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1 text-text">
            User Type
          </label>

          <select {...register("userType")} className={inputClass}>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all"
        >
          Update User Type
        </button>

        <p className="text-center mt-4 text-sm text-text">
          View all users?{" "}
          <Link
            to="/dashboard/users"
            className="font-semibold underline text-primary"
          >
            User List
          </Link>
        </p>
      </form>
    </div>
  );
};

export default EditUser;
