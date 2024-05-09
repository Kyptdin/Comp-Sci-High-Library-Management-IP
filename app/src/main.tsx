import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from "./pages/HomePage.tsx";
import { Search } from "./pages/Search.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "search/:searchQuery",
    element: <Search />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
