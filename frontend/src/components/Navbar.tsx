// Import necessary components and hooks
import { ImLibrary } from "react-icons/im";
import { LoginButton } from "@/components/AuthUi/LoginButton";
import { SearchBar } from "@/components/Discover/SearchBar";
import { Link } from "react-router-dom";
import { useGetLoggedInUser } from "@/hooks/user/useGetLoggedInUser";
import { UserProfile } from "./AuthUi/UserProfile";

// Define the Props interface for the component props
interface Props {
  showNavbar?: boolean; // Optional prop to show or hide the navbar
}

/**
 * Navbar Component
 *
 * This component represents the navigation bar of the application. It displays the library name, a search bar,
 * and the user's profile image or a login button depending on the user's authentication status.
 *
 * @param {boolean} [showNavbar=true] - Whether to show the navbar (optional, default is true).
 *
 * Usage:
 *
 * ```jsx
 * import { Navbar } from 'path/to/Navbar';
 *
 * const App = () => (
 *   <Navbar showNavbar={true} />
 * );
 * ```
 *
 * This will render the navigation bar with the specified visibility.
 */
export const Navbar = ({ showNavbar = true }: Props) => {
  const { data } = useGetLoggedInUser();
  const imageUrl = data?.generalUserData?.user_metadata?.avatar_url;

  return (
    <div className="px-5 py-[30px] mx-[25px] flex justify-between items-center font-outfit">
      <Link
        to={"/"}
        className="flex items-center justify-center text-gray-200 "
      >
        <ImLibrary size={30} />
        <h2 className="font-bold ml-3 text-lg">COMP SCI HIGH LIBRARY</h2>
      </Link>

      {showNavbar ? <SearchBar /> : null}
      {imageUrl ? <UserProfile profileImageUrl={imageUrl} /> : <LoginButton />}
    </div>
  );
};
