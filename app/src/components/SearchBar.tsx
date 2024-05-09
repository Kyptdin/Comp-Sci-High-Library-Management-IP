import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { PiKeyReturnFill } from "react-icons/pi";

import { useParams, useNavigate  } from "react-router-dom";
import { useState } from "react";

export const SearchBar = ({className} : {
    className?: string
}) => {
    const { searchQuery } = useParams();
    const navigate = useNavigate();

    let initialSearch = searchQuery ? searchQuery : "";
    const [searchText, setSearchText] = useState(initialSearch);

    return <div className={cn(
        "font-outfit text-xl",
        "w-[500px] flex justify-center items-center", 
        className
    )}> 
        <form 
            className="w-full m-0 p-0"
            onSubmit={() => navigate(`/search/${searchText}`)}
        >
            <input 
                type="text" 
                placeholder="Search book or author" 
                onChange={event => setSearchText(event.target.value)}
                value={searchText}
                className={cn(
                    "focus:outline-none",   
                    "rounded-full w-full py-2 px-5",
                    "duration-50 transition ease-out"
                )}
            />
        </form>

        <Button 
            variant="link" 
            className="hover:scale-[120%] duration-200 ease-linear transition"
            onClick={() => navigate(`/search/${searchText}`)}
        >
            <PiKeyReturnFill color="white" size={35} className="ml-[5px]"/>
        </Button>
    </div>;
}