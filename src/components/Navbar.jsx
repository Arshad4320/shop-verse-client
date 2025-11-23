import React, { useState } from "react";
import { Link } from "react-router";
import { Fade as Hamburger } from "hamburger-react";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { totalQty } = useSelector((state) => state.cart);

  const routeLinks = (
    <>
      <Link
        onClick={() => setIsOpen(false)}
        to="/"
        className="text-text hover:text-primary"
      >
        Home
      </Link>

      <Link
        onClick={() => setIsOpen(false)}
        to="/about"
        className="text-text hover:text-primary"
      >
        About
      </Link>

      <Link
        onClick={() => setIsOpen(false)}
        to="/products"
        className="text-text hover:text-primary"
      >
        Products
      </Link>

      <Link
        onClick={() => setIsOpen(false)}
        to="/dashboard"
        className="text-text hover:text-primary"
      >
        Dashboard
      </Link>

      {/* Cart Icon (Desktop + Mobile both) */}
      <Link
        to="/cart"
        onClick={() => setIsOpen(false)}
        className="relative flex items-center text-text hover:text-primary"
      >
        <IoCartOutline size={20} />

        <span className="absolute -top-1 -right-2 sm:-top-2 sm:-right-3 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {totalQty}
        </span>
      </Link>

      <Link
        onClick={() => setIsOpen(false)}
        to="/login"
        className="text-text hover:text-primary"
      >
        Login
      </Link>

      <Link
        onClick={() => setIsOpen(false)}
        to="/register"
        className="text-text hover:text-primary"
      >
        Register
      </Link>

      <button className="bg-danger px-3 text-white py-1 w-24 rounded hover:bg-danger/90">
        Logout
      </button>
    </>
  );

  return (
    <nav className="fixed w-full top-0 left-0 z-60 shadow text-md font-medium bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-0 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Brand</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between gap-6">
          {routeLinks}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center text-primary">
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-4 text-white">{routeLinks}</div>
      </div>
    </nav>
  );
};

export default Navbar;
