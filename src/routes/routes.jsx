import React from "react";
import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import DashboardLayout from "../Layout/DashboardLayout";
import MainLayout from "../Root/MainLayout";

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
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardLayout />,
      },
    ],
  },
]);

export default routes;
