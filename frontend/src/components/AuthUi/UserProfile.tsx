// Import necessary components and hooks
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Custom dropdown menu components

import { IoLogOut } from "react-icons/io5"; // Logout icon from react-icons/io5
import { MdAdminPanelSettings } from "react-icons/md"; // Admin icon from react-icons/md
import { FaBookBookmark } from "react-icons/fa6"; // Borrowing icon from react-icons/fa6
import { Skeleton } from "@/components/ui/skeleton"; // Custom Skeleton component for loading state
import { useLogout } from "@/hooks/auth/useLogout"; // Custom hook to handle logout
import { cn } from "@/lib/utils"; // Utility function for conditional class names
import { useGetLoggedInUser } from "@/hooks/user/useGetLoggedInUser"; // Custom hook to get logged in user data
import { useNavigate } from "react-router-dom"; // Hook to navigate programmatically

// Define the Props interface
interface Props {
  profileImageUrl: string | null;
}

/**
 * UserProfile Component
 *
 * This component displays the user's profile image and provides a dropdown menu with options to log out
 * and, if the user is an admin, to add a book. The component handles both displaying the user's profile
 * image and the dropdown menu functionalities.
 *
 * @param {string | null} profileImageUrl - URL of the user's profile image. If null, a loading skeleton is displayed.
 *
 * Usage:
 *
 * ```jsx
 * import { UserProfile } from 'path/to/UserProfile';
 *
 * const App = () => (
 *   <UserProfile profileImageUrl={userProfileImageUrl} />
 * );
 * ```
 *
 * This will render the user's profile image with a dropdown menu for log out and admin options.
 */
export const UserProfile = ({ profileImageUrl }: Props) => {
  const { mutateAsync } = useLogout(); // Hook to handle logout
  const navigate = useNavigate(); // Hook to navigate programmatically
  
  const { data } = useGetLoggedInUser(); // Hook to get logged in user data
  const isAdmin = data?.userMetaData[0].admin_status === "admin"; // Check if the user is an admin

  // Display loading skeleton if profileImageUrl is null
  if (!profileImageUrl) {
    return <Skeleton className="w-[60px] h-[60px] rounded-2xl" />;
  }

  // Function to handle logout
  async function logout() {
    await mutateAsync();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "w-[50px] h-[50px] p-0",
            "rounded-2xl border-[3px] border-gray-600",
            "hover:cursor-pointer"
          )}
        >
          <img
            src={profileImageUrl}
            alt="profile image"
            className="w-full h-full rounded-xl"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mr-[50px]">
        <DropdownMenuItem
          className="text-red-800 cursor-pointer"
          onClick={logout} // Handle logout on click
        >
          <IoLogOut size={32} />
          <p className="font-bold font-lg ml-1">Log out</p>
        </DropdownMenuItem>

        {isAdmin && ( // Display admin option if the user is an admin
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/admin/addBooks")} // Navigate to addBooks page on click
          >
            <MdAdminPanelSettings size={28} />
            <p className="font-bold font-lg ml-1">Admin Menu</p>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigate("/borrowing")} // Navigate to addBooks page on click
        >
          <FaBookBookmark size={24} />
          <p className="font-bold font-lg ml-2">My books</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
