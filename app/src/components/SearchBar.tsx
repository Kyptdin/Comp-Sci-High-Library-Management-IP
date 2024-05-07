import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { IoSearch } from "react-icons/io5";

export const SearchBar = ({className} : {
    className?: string
}) => {
    return <div className={cn(
        "py-1 mb-3 font-outfit text-xl",
        "w-[500px] flex justify-center items-center", 
        className
    )}>
        <input type="text" className={cn(
            "focus:outline-none",
            "rounded-full w-full py-2 px-5",
            "duration-50 transition ease-out"
        )}/>

        <Button variant="link" className="hover:scale-110 duration-50 ease-linear transition">
            <IoSearch color="white" size={40} className="ml-2"/>
        </Button>
    </div>;
}