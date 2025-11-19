import { useState } from "react";
import { Link } from "react-router";
import { Divide as Hamburger } from "hamburger-react";
const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform 
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:w-64 w-56 transition-transform duration-300`}
      >
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-green-600">Dashboard</h2>
        </div>

        <ul className="p-4 space-y-3">
          <li>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded hover:bg-green-100"
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/users"
              className="block px-3 py-2 rounded hover:bg-green-100"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/products"
              className="block px-3 py-2 rounded hover:bg-green-100"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/orders"
              className="block px-3 py-2 rounded hover:bg-green-100"
            >
              Orders
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 w-full">
        {/* Top Navbar */}
        <div className="bg-white shadow p-4 flex items-center justify-between">
          <div className="md:hidden text-green-500  ">
            <Hamburger toggled={open} toggle={setOpen} />
          </div>

          <h1 className="text-xl font-semibold">Admin Panel</h1>

          <div>
            <button className="bg-red-500 text-white px-4 py-1 rounded">
              Logout
            </button>
          </div>
        </div>

        {/* Inner Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
