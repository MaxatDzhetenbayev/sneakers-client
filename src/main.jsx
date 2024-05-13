import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "macro-css";
import App from "./App";
import Home from "./pages/Home";
import { CartProvider } from "./contexts/cartContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "profile", element: <Profile /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <CartProvider>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer />
  </CartProvider>
);
