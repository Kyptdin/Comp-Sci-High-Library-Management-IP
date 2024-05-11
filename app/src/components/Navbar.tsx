import { ImLibrary } from "react-icons/im";

import { LoginButton } from "@/components/AuthUi/LoginButton";
import { UserProfile } from "@/components/AuthUi/UserProfile";
import { SearchBar } from "@/components/SearchBar";

import { Link } from "react-router-dom";

export const Navbar = ({ showNavbar = true }: { showNavbar?: boolean }) => {
  // const { userData } = useLoggedInUser();
  // console.log(userData);

  return (
    <div className="px-5 py-[30px] mx-[25px] flex justify-between items-center font-outfit">
      <Link to={"/"} className="flex items-center justify-center text-gray-200">
        <ImLibrary size={25} />
        <h2 className="font-bold ml-3">COMP SCI HIGH LIBRARY</h2>
      </Link>

      {showNavbar ? <SearchBar /> : null}

      <LoginButton />
      <UserProfile />
    </div>
  );
};
