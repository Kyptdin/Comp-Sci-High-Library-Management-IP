import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/Discover/SearchBar";
import { LuckyBook } from "@/components/Discover/LuckyBook";
import { AllBooks } from "@/components/Discover/AllBooks";

/**
 * This file contains the `HomePage` component, which is used as the landing page of the application.
 *
 * Dependencies:
 * - `Navbar` from `@/components/Navbar` for rendering the navigation bar.
 * - `SearchBar` from `@/components/SearchBar` for rendering the search bar.
 *
 * Functionality:
 * - The component renders a background gradient from gray to teal covering the entire screen height.
 * - It renders a navigation bar with `showNavbar` set to false, indicating that the navbar should not be displayed.
 * - The main content area contains a flex container with vertical and horizontal centering to display the logo, search bar, and welcome message.
 * - The `SearchBar` component is used to allow users to search for books.
 *
 * Usage:
 * - This component is used as the landing page of the library management system.
 * - It provides users with the ability to search for books and access other features of the system.
 *
 * @returns JSX element representing the home page with a logo, search bar, and welcome message.
 */
export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950">
      <Navbar showNavbar={false} />
      <div className="full-center flex-col p-5 h-[80vh]">
        <img src="/school_logo.png" className="mb-[35px] w-1/4" />

        <SearchBar />

        <div className="full-center">
          <AllBooks />
          <LuckyBook />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
