import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { NavLink, Outlet } from "react-router-dom";

export const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950 flex flex-col">
      <Navbar showNavbar={false} />
      <div className="flex-grow flex">
        {/* Sidebar */}
        <div className="w-[20%] p-4 flex flex-col gap-5">
          <NavLink to={"searchStudent"}>
            {({ isActive }) => (
              <Button
                className={`w-full ${
                  isActive ? "bg-teal-800" : "bg-teal-600"
                } text-white py-4 text-lg rounded hover:bg-teal-800 transition duration-200`}
              >
                Search Student
              </Button>
            )}
          </NavLink>
          <NavLink to={"addBooks"}>
            {({ isActive }) => (
              <Button
                className={`w-full ${
                  isActive ? "bg-teal-800" : "bg-teal-600"
                } text-white py-4 text-lg rounded hover:bg-teal-800 transition duration-200`}
              >
                Add Books
              </Button>
            )}
          </NavLink>
          <NavLink to={"editBooks"}>
            {({ isActive }) => (
              <Button
                className={`w-full ${
                  isActive ? "bg-teal-800" : "bg-teal-600"
                } text-white py-4 text-lg rounded hover:bg-teal-800 transition duration-200`}
              >
                Edit Books
              </Button>
            )}
          </NavLink>
          <NavLink to={"reports"}>
            {({ isActive }) => (
              <Button
                className={`w-full ${
                  isActive ? "bg-teal-800" : "bg-teal-600"
                } text-white py-4 text-lg rounded hover:bg-teal-800 transition duration-200`}
              >
                Reports
              </Button>
            )}
          </NavLink>
        </div>
        {/* Main content */}
        <Outlet />
      </div>
    </div>
  );
};
