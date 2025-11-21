import { useState } from "react";
import { Link, Outlet } from "react-router";
import { Divide as Hamburger } from "hamburger-react";

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [userDrop, setUserDrop] = useState(false);
  const [productDrop, setProductDrop] = useState(false);
  const [categoryDrop, setCategoryDrop] = useState(false);

  const dropdownIcon = (open) => (open ? "▾" : "▸"); // modern arrow

  return (
    <div className="min-h-screen flex bg-bg">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full  shadow-lg bg-white z-50 transform 
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:w-64 w-56 transition-transform duration-300`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
        </div>

        <ul className="p-4 space-y-3 text-text">
          {/* Overview */}
          <li>
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded hover:bg-secondary/20"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded hover:bg-secondary/20"
            >
              Overview
            </Link>
          </li>

          {/* Users Dropdown */}
          <li>
            <button
              onClick={() => setUserDrop(!userDrop)}
              className="flex justify-between items-center w-full px-3 py-2 rounded hover:bg-secondary/20"
            >
              <span>Users</span>
              <span className="text-secondary">{dropdownIcon(userDrop)}</span>
            </button>
            {userDrop && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/dashboard/users"
                    className="block px-3 py-1 rounded hover:bg-secondary/20"
                  >
                    Users List
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Products Dropdown */}
          <li>
            <button
              onClick={() => setProductDrop(!productDrop)}
              className="flex justify-between items-center w-full px-3 py-2 rounded hover:bg-secondary/20"
            >
              <span>Products</span>
              <span className="text-secondary">
                {dropdownIcon(productDrop)}
              </span>
            </button>
            {productDrop && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/dashboard/products"
                    className="block px-3 py-1 rounded hover:bg-secondary/20"
                  >
                    Products List
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/dashboard/add-product"
                    className="block px-3 py-1 rounded hover:bg-secondary/20"
                  >
                    Add Product
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Category Dropdown */}
          <li>
            <button
              onClick={() => setCategoryDrop(!categoryDrop)}
              className="flex justify-between items-center w-full px-3 py-2 rounded hover:bg-secondary/20"
            >
              <span>Category</span>
              <span className="text-secondary">
                {dropdownIcon(categoryDrop)}
              </span>
            </button>
            {categoryDrop && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/dashboard/category"
                    className="block px-3 py-1 rounded hover:bg-secondary/20"
                  >
                    Category List
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/dashboard/add-category"
                    className="block px-3 py-1 rounded hover:bg-secondary/20"
                  >
                    Add Category
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 w-full">
        <div className="bg-card shadow p-4 flex items-center justify-between">
          <div className="md:hidden text-primary">
            <Hamburger toggled={open} toggle={setOpen} />
          </div>

          <h1 className="text-xl font-semibold text-primary">Admin Panel</h1>

          <button className="bg-danger text-white px-4 py-1 rounded">
            Logout
          </button>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
