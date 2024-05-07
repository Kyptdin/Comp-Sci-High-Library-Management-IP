import { ImLibrary } from "react-icons/im";
import { BsGoogle } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";


export const Navbar = () => {
  return (<div className="p-5 py-[30px] mx-[25px] flex justify-between items-center font-outfit">
    <div className="flex items-center justify-center text-gray-200">
      <ImLibrary size={25}/>
      <h2 className="font-bold ml-3">COMP SCI HIGH LIBRARY</h2>
    </div>

    <SearchBar/>

    <div>
      <Button variant="secondary" className="rounded-full">
        <BsGoogle size={20} className="mr-3"/>
        LOGIN WITH GOOGLE
      </Button>
    </div>
  </div>);
}
