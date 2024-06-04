import { Navbar } from "@/components/Navbar";
import { Error } from "@/components/Error";
/**
 * This file contains the `ErrorPage` component, which is used to display an error page with a navigation bar and an error component.
 *
 * Dependencies:
 * - `Navbar` from `@/components/Navbar` for rendering the navigation bar.
 * - `Error` from `@/components/Error` for rendering the error component.
 *
 * Functionality:
 * - The component renders a background gradient from gray to teal covering the entire screen height.
 * - It renders a navigation bar with `showNavbar` set to true, indicating that the navbar should be displayed.
 * - The main content area contains a flex container with vertical and horizontal centering to display the error component.
 * - The `Error` component is used to render the actual error message or UI.
 *
 * Usage:
 * - This component is typically used to display an error page when an error occurs in the application.
 * - It provides a user-friendly way to handle errors and guide users on how to proceed.
 *
 * @returns JSX element representing the error page with a navigation bar and error component.
 */
export const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950">
      <Navbar showNavbar={true} />

      <div className="flex flex-col justify-center items-center p-5 h-[80vh]">
        <Error />
      </div>
    </div>
  );
};
