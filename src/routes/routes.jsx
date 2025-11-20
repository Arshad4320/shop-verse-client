import React from "react";
import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import DashboardLayout from "../Layout/DashboardLayout";
import MainLayout from "../Root/MainLayout";
import Register from "./../pages/Register";
import Login from "../pages/Login";
import AddCategory from "../dashboard/category/AddCategory";
import CategoryList from "../dashboard/category/CategoryList";
import EditCategory from "../dashboard/category/EditCategory";
import Dashboard from "../dashboard/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "category",
        element: <CategoryList />,
      },
      {
        path: "edit-category/:id",
        element: <EditCategory />,
      },
    ],
  },
]);

export default routes;
