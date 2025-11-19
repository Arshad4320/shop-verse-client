import React, { useState } from "react";
import { Link } from "react-router";
import { Fade as Hamburger } from "hamburger-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const routeLinks = (
    <>
      <Link
        onClick={() => setIsOpen(false)}
        to="/"
        className="hover:text-green-600 text-green-500"
      >
        Home
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        to="/about"
        className="hover:text-green-600 text-green-500"
      >
        About
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        to="/products"
        className="hover:text-green-600 text-green-500"
      >
        Products
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        to="/dashboard"
        className="hover:text-green-600 text-green-500"
      >
        Dashboard
      </Link>

      <Link
        onClick={() => setIsOpen(false)}
        to="/login"
        className="hover:text-green-600 text-green-500"
      >
        Login
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        to="/register"
        className="hover:text-green-600 text-green-500"
      >
        Register
      </Link>
      <button className="bg-red-600 px-3 py-1 w-24 rounded hover:bg-red-700">
        Logout
      </button>
    </>
  );

  return (
    <nav className="bg-white fixed w-full top-0 left-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 lg:px-0 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Brand</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between gap-6">
          {routeLinks}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-4">{routeLinks}</div>
      </div>
    </nav>
  );
};

export default Navbar;
