import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logOut } from "../redux/features/auth/authSlice";

const LogoutButton = ({ text }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout button");
    dispatch(logOut());
    navigate("/");
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-danger px-3 text-white py-1 w-24 rounded hover:bg-danger/90"
    >
      {text}
    </button>
  );
};

export default LogoutButton;
