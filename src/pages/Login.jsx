import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const inputClass =
    "w-full border border-primary p-2 rounded transition-all focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none";

  return (
    <div className="min-h-screen flex justify-center items-center bg-bg px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card shadow-lg rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-text">Email</label>
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
            <p className="text-danger text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-text">Password</label>
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
            <p className="text-danger text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-purple-700 text-white py-2 rounded-lg font-semibold  transition-all"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm text-text">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary font-semibold underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
