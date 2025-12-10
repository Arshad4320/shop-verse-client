import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredential } from "../redux/features/auth/authSlice";
import logo from "../assets/logo-2.png";
import bg from "../assets/bg.avif";
import { clearOrderInfo } from "../redux/features/order/orderSlice";

const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
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
      const result = await loginUser(data).unwrap();
      dispatch(clearOrderInfo());
      dispatch(
        setCredential({
          user: result?.data?.user,
          token: result?.data?.token,
        })
      );

      if (!result.success) return toast.error(result.message);

      toast.success(result.message || "Logged in successfully");
      reset();
      navigate(location.state || "/");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const inputClass =
    "w-full border border-primary/50 p-3 rounded-lg bg-white backdrop-blur-md text-text focus:border-primary focus:ring-2 focus:ring-primary w-full focus:outline-none transition-all ";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Responsive Glass Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="backdrop-blur-xl bg-primary/10 shadow-2xl rounded-2xl 
                   py-6 px-6 sm:px-8 w-full max-w-sm sm:max-w-md 
                   border border-white/20"
      >
        {/* Logo */}
        <div className="w-28 md:w-36 mx-auto">
          <Link to="/">
            <img className="w-full h-full object-contain" src={logo} />
          </Link>
        </div>

        <h2 className="text-2xl sm:text-3xl text-white font-bold mt-6 mb-4 text-center">
          Login
        </h2>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1 text-white/90">
            Email
          </label>
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
            <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-white/90">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
            })}
            className={inputClass}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-300 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white 
                     py-2 sm:py-3 rounded-lg font-semibold transition-all shadow-lg"
        >
          Login
        </button>

        {/* Bottom Link */}
        <p className="text-center mt-4 text-white/90 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-300 font-semibold underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
