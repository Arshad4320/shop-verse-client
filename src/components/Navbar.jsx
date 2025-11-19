import React, { useState } from "react";
import { Link } from "react-router"; // react-router-dom
import { Fade as Hamburger } from 'hamburger-react'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white fixed w-full top-0 left-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 lg:px-0 flex justify-between items-center h-16">
        {/* Logo / Brand */}
        <div className="text-xl font-bold">
          <Link to="/">Brand</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/products" className="hover:text-gray-300">
            Products
          </Link>
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
          <Link to="/register" className="hover:text-gray-300">
            Register
          </Link>
          <button className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-secondary transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          <Link to="/" className="hover:text-gray-300" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/products" className="hover:text-gray-300" onClick={toggleMenu}>
            Products
          </Link>
          <Link to="/login" className="hover:text-gray-300" onClick={toggleMenu}>
            Login
          </Link>
          <Link to="/register" className="hover:text-gray-300" onClick={toggleMenu}>
            Register
          </Link>
          <button
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            onClick={toggleMenu}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
