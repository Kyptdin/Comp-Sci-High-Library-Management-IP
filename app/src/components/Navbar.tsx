import { ImLibrary } from "react-icons/im";
import { BsGoogle } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";

import { Link } from "react-router-dom";

export const Navbar = ({showNavbar = true} : {
  showNavbar?: boolean
}) => {
  return (<div className="px-5 py-[30px] mx-[25px] flex justify-between items-center font-outfit">
    <Link 
      to={"/"}
      className="flex items-center justify-center text-gray-200"
    >
      <ImLibrary size={25}/>
      <h2 className="font-bold ml-3">COMP SCI HIGH LIBRARY</h2>
    </Link>

    {showNavbar ? <SearchBar/> : <></>}

    <Button variant="secondary" className="rounded-full">
      <BsGoogle size={20} className="mr-3"/>
      LOGIN WITH GOOGLE
    </Button>
  </div>);
}
