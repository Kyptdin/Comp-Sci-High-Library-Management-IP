import { ImLibrary } from "react-icons/im";
import { LoginButton } from "@/components/AuthUi/LoginButton";
import { SearchBar } from "@/components/SearchBar";
import { Link } from "react-router-dom";
import { useGetLoggedInUser } from "@/hooks/user/useGetLoggedInUser";
import { UserProfile } from "./AuthUi/UserProfile";

interface Props {
  showNavbar?: boolean;
}

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
