import React from "react";
import Navbar from "./../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="  my-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
