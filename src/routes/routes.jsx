import React from "react";
import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import Products from "../pages/Products";
import DashboardLayout from "../Layout/DashboardLayout";
import MainLayout from "../Root/MainLayout";
import Register from "./../pages/Register";
import Login from "../pages/Login";
import AddCategory from "../dashboard/category/AddCategory";
import CategoryList from "../dashboard/category/CategoryList";
import EditCategory from "../dashboard/category/EditCategory";
import Dashboard from "../dashboard/Dashboard";
import AddProduct from "../dashboard/product/AddProduct";
import EditProduct from "../dashboard/product/EditProduct";
import ProductList from "../dashboard/product/ProductList";
import CategoryDetails from "../pages/CategoryDetails";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import PrivetRoute from "../utilitis/privetRoute";
import OrderSuccess from "../pages/OrderSuccess";
import OrderPage from "../pages/Order";
import Electronics from "../components/categoryProduct/Electronics";
import UserList from "../dashboard/user/userList";
import OrderList from "../dashboard/order/OrderList";

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
        path: "profile",
        element: (
          <PrivetRoute>
            {" "}
            <Profile />
          </PrivetRoute>
        ),
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "order",
        element: (
          <PrivetRoute>
            <OrderPage />
          </PrivetRoute>
        ),
      },
      {
        path: "success",
        element: <OrderSuccess />,
      },
      {
        path: "product/details/:id",
        element: <ProductDetails />,
      },
      {
        path: "category/details/:id",
        element: <CategoryDetails />,
      },
      {
        path: "category/electronics/:id",
        element: <Electronics />,
      },
      {
        path: "cart",
        element: <Cart />,
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
    element: (
      <PrivetRoute>
        <DashboardLayout />
      </PrivetRoute>
    ),
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
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "users",
        element: <UserList />,
      },
      {
        path: "orders",
        element: <OrderList />,
      },
    ],
  },
]);

export default routes;
