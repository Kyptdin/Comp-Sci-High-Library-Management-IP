import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { PiKeyReturnFill } from "react-icons/pi";

export const SearchBar = ({className} : {
    className?: string
}) => {
    return <div className={cn(
        "font-outfit text-xl",
        "w-[500px] flex justify-center items-center", 
        className
    )}>
        <input type="text" placeholder="Search book or author" className={cn(
            "focus:outline-none",
            "rounded-full w-full py-2 px-5",
            "duration-50 transition ease-out"
        )}/>

        <Button variant="link" className="hover:scale-[120%] duration-200 ease-linear transition">
            <PiKeyReturnFill color="white" size={35} className="ml-[5px]"/>
        </Button>
    </div>;
}