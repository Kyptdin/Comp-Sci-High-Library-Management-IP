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
