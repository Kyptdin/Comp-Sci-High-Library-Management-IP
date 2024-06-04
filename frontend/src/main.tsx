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
import { SearchStudentAdminPage } from "./subpages/SearchStudentAdminPage.tsx";
import { AddBooksAdminPage } from "./subpages/AddBooksAdminPage.tsx";
import { EditBooksAdminPage } from "./subpages/EditBooksAdminPage.tsx";
import { ReportBooksPage } from "./subpages/ReportBooksPage.tsx";
import { MultiAddBooksAdminPage } from "./subpages/MultiAddBooksAdminPage.tsx";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Create a browser router with route configuration
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
    element: (
      <ProtectedPage onlyForAdmin={true}>
        <AdminPage />
      </ProtectedPage>
    ),
    children: [
      { path: "searchUser", element: <SearchStudentAdminPage /> },
      { path: "addBooks", element: <AddBooksAdminPage /> },
      { path: "multiAddBooks", element: <MultiAddBooksAdminPage/> },
      { path: "editBooks", element: <EditBooksAdminPage /> },
      { path: "reports", element: <ReportBooksPage /> },
    ],
  },
]);

// Render the application root
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
