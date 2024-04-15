import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "macro-css";
import App from "./App";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import { CartProvider } from "./contexts/cartContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AuthCheck } from "./components/AuthCheck";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthCheck>
            <Home />
          </AuthCheck>
        ),
      },
      {
        path: "favorites",
        element: (
          <AuthCheck>
            <Favorites />
          </AuthCheck>
        ),
      },
      // { path: "orders", element: <Orders /> },
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
  </CartProvider>
);
