import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const inputClass =
    "w-full border border-green-300 p-2 rounded transition-all focus:border-green-500 focus:ring-2 focus:ring-green-300 focus:outline-none";

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <h2 className="text-3xl font-bold col-span-1 md:col-span-2 text-center mb-2">
          Create User
        </h2>

        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className={inputClass}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            className={inputClass}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={inputClass}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold mb-1">Phone</label>
          <input
            {...register("address.phone")}
            className={inputClass}
            placeholder="Phone Number"
          />
        </div>

        {/* Upozilla */}
        <div>
          <label className="block font-semibold mb-1">Upozilla</label>
          <input
            {...register("address.upozilla")}
            className={inputClass}
            placeholder="Upozilla"
          />
        </div>

        {/* City */}
        <div>
          <label className="block font-semibold mb-1">City</label>
          <input
            {...register("address.city")}
            className={inputClass}
            placeholder="City"
          />
        </div>

        {/* User Type */}
        <div>
          <label className="block font-semibold mb-1">User Type</label>
          <select {...register("userType")} className={inputClass}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 mt-2">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Register
          </button>

          <p className="text-center mt-3 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
