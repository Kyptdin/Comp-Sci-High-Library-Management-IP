import { Button } from "@/components/ui/button"
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import { Warning } from "./Warning";

import { FaExpandArrowsAlt } from "react-icons/fa";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaBug } from "react-icons/fa";

type bookData = {
    children: string,
    author?: string,
    image?: string,
    isAvaliable?: boolean
};

export const BookDisplay = ({
    children, 
    image, 
    isAvaliable = true, 
    author
} : bookData) => {

    return <div className={cn(
        "w-[325px] h-[500px] m-4 relative",
        "bg-black overflow-clip rounded-2xl font-outfit",
        "flex flex-col justify-end items-center",
        "hover:scale-105 transition ease-in-out duration-300"
    )}>
        <img src={image} className="w-full h-full absolute fill-gray-400"/>

        <div className="w-full h-full bg-gradient-to-t from-teal-950 absolute">
        </div>

        <div className="p-5 absolute w-full">
            <h1 className="text-2xl font-bold mt-2 text-white">{children}</h1>
            <p className="text-lg mb-3 italic text-white">By: {author}</p>

            {!isAvaliable ? 
            <Warning>NOT AVALIABLE</Warning> :
            <Button className="w-full font-bold shadow-md text-md" variant="outline" size="lg">BORROW</Button>}

            <div className="flex justify-end items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="mt-3" variant="link">
                            <MdOutlineMoreHoriz size={35} color="white"/>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                        <DropdownMenuItem className="text-red-800">
                            <FaBug size={20}/>
                            <p className="font-bold font-lg ml-1">Report</p>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <FaExpandArrowsAlt size={20}/>
                            <p className="font-bold font-lg ml-1">Learn more</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
  </div>
}