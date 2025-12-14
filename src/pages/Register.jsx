import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { useCreateUserMutation } from "../redux/features/auth/authApi";
import { toast } from "react-toastify";
import logo from "../assets/logo-3.png";
import bg from "../assets/bg.avif";
const Register = () => {
  const [createUser] = useCreateUserMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data).unwrap();
      console.log(result);
      toast.success(result.message || "user created successfully");
      navigate(location?.state || "/");
      reset();
    } catch (err) {
      console.log(err);
      toast.error(err.data.message || "something went wrong");
    }
  };

  const inputClass =
    "w-full border border-primary/50 p-3 rounded-lg bg-white backdrop-blur-md text-text focus:border-primary focus:ring-2 focus:ring-primary w-full focus:outline-none transition-all ";

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4 relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
    backdrop-blur-xl bg-primary/10 shadow-2xl rounded-2xl 
    py-6 px-6 sm:px-8 
    w-full max-w-md md:max-w-2xl 
    border border-white/20 
    grid grid-cols-1 md:grid-cols-2 gap-4
  "
      >
        {/* Logo */}
        <div className="w-48 md:w-60 mx-auto col-span-1 md:col-span-2">
          <Link to="/">
            <img className="w-full h-full" src={logo} />
          </Link>
        </div>
        {/* Title */}
        <h2 className="text-3xl col-span-1 md:col-span-2 text-white font-bold mt-4 mb-3 text-center drop-shadow-md">
          Register
        </h2>
        {/* Name */}
        <div>
          <label className="font-semibold mb-1 text-white/90">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className={inputClass}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-danger text-sm">{errors.name.message}</p>
          )}
        </div>
        {/* Email */}
        <div>
          <label className="font-semibold mb-1 text-white/90">Email</label>
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
            <p className="text-danger text-sm">{errors.email.message}</p>
          )}
        </div>
        {/* Password */}
        <div>
          <label className="font-semibold mb-1 text-white/90">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className={inputClass}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-danger text-sm">{errors.password.message}</p>
          )}
        </div>
        {/* Phone */}
        <div>
          <label className="font-semibold mb-1 text-white/90">Phone</label>
          <input
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^(01[3-9]\d{8})$/,
                message: "Please enter a valid Bangladeshi phone number",
              },
            })}
            className={inputClass}
            placeholder="Phone Number"
          />
          {errors.phone && (
            <p className="text-danger text-sm">{errors.phone.message}</p>
          )}
        </div>
        {/* Submit */}
        <div className="col-span-1 md:col-span-2 mt-2">
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white p-3 rounded-lg font-semibold transition-all shadow-lg"
          >
            Register
          </button>

          <p className="text-center mt-4 text-white/90 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-300 font-semibold underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
