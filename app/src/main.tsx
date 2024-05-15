import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from "./pages/HomePage.tsx";
import { SearchPage } from "./pages/SearchPage.tsx";
import { ErrorPage } from "./pages/ErrorPage.tsx";
import { InspectPage } from "./pages/InspectPage.tsx";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProtectedPage } from "./pages/ProtectedPage.tsx";
import { Toaster } from "@/components/ui/toaster";
import { NotAuthorizedPage } from "./pages/NotAuthorizedPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { SearchAdminPage } from "./subpages/SearchAdminPage.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "search/:searchQuery",
    element: (
      <ProtectedPage>
        <SearchPage />
      </ProtectedPage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "inspect/:bookInspectIsbn",
    element: (
      <ProtectedPage>
        <InspectPage />
      </ProtectedPage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "notAuthorized",
    element: <NotAuthorizedPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin",
    element: <AdminPage />,
    children: [
      { path: "searchStudents", element: <SearchAdminPage /> },
      { path: "addBooks", element: <div>Add page</div> },
      { path: "editBooks", element: <div>Edit page</div> },
      { path: "reports", element: <div>Reports</div> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
