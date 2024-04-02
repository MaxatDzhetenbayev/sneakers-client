import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom";
import { AppProvider } from "./context";
import "./index.scss";
import "macro-css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import App from "./App";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import { CartProvider } from "./contexts/cartContext";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "favorites", element: <Favorites /> },
      { path: "orders", element: <Orders /> },
    ],
  },
]);
const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AppProvider>
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </CartProvider>
  </AppProvider>
);
