import React from "react";
import Navbar from "./../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
