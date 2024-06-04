/**
 * This file contains the `AdminPage` component, which serves as the main page for admin-related actions.
 *
 * Dependencies:
 * - `Navbar` from `@/components/Navbar` for the navigation bar.
 * - `Button` from `@/components/ui/button` for rendering buttons.
 * - `NavLink` and `Outlet` from `react-router-dom` for managing routing.
 * - `Separator` from `@radix-ui/react-dropdown-menu` for rendering a visual separator in the sidebar.
 * - `useEffect` and `useRef` from `react` for handling side effects and refs, respectively.
 * - `useGetLoggedInUser` from `@/hooks/user/useGetLoggedInUser` for fetching the currently logged-in user's data.
 *
 * Functionality:
 * - The component fetches the logged-in user's data to determine if the user is an admin.
 * - It conditionally renders a sidebar with admin action buttons based on the user's admin status.
 * - It uses `NavLink` for routing to different admin actions like searching for users, adding books, editing books, and viewing reports.
 * - When the component mounts and the user is an admin, it automatically clicks the "Search User" button to show the default content.
 * - The main content area (`Outlet`) renders the appropriate component based on the selected admin action route.
 *
 * @returns JSX element representing the admin page with sidebar and main content area.
 */
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

import { NavLink, Outlet } from "react-router-dom";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useEffect, useRef } from "react";
import { useGetLoggedInUser } from "@/hooks/user/useGetLoggedInUser";

export const AdminPage = () => {
  const defaultRouteButtonRef = useRef<HTMLButtonElement>(null);
  const notOnTheNestedRoutes = window.location.href.endsWith("/admin");
  const { data: loggedIUserData } = useGetLoggedInUser();
  const userIsAdmin = loggedIUserData?.userMetaData[0].admin_status === "admin";

  useEffect(() => {
    const searchButton = defaultRouteButtonRef.current;
    if (!searchButton || !notOnTheNestedRoutes || !userIsAdmin) return;
    searchButton.click();
  }, [notOnTheNestedRoutes, userIsAdmin]);

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950 flex flex-col">
      <Navbar showNavbar={false} />
      <div className="flex flex-grow font-outfit">
        {/* Sidebar */}
        <div className="w-[20%] p-4 flex flex-col gap-2">
          <h2 className="text-white text-xl">Action menu</h2>
          <Separator className="bg-gray-500 my-1 py-[1px]" />

          <NavLink to={"searchUser"}>
            <Button
              className="w-full py-4 text-lg"
              variant="secondary"
              ref={defaultRouteButtonRef}
            >
              Search User
            </Button>
          </NavLink>
          <NavLink to={"addBooks"}>
            <Button className="w-full py-4 text-lg" variant="secondary">
              Add Books
            </Button>
          </NavLink>
          <NavLink to={"multiAddBooks"}>
            <Button className="w-full py-4 text-lg" variant="secondary">
              Bulk Add Books
            </Button>
          </NavLink>
          <NavLink to={"editBooks"}>
            <Button className="w-full py-4 text-lg" variant="secondary">
              Edit Books
            </Button>
          </NavLink>
          <NavLink to={"reports"}>
            <Button className="w-full py-4 text-lg" variant="secondary">
              Reports
            </Button>
          </NavLink>

          <Separator className="bg-gray-500 mt-2 py-[1px]" />
          <p className="text-lg text-gray-600 flex">
            Work is in progress, please don't spam buttons.
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
