import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { IoLogOut } from "react-icons/io5";
import { BiSolidBookAdd } from "react-icons/bi";

export const UserProfile = () => {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button 
                className="mt-3 w-[60px] h-[60px] rounded-2xl bg-white border-4 border-green-600" 
                variant="link"
            >
                <span className="">000</span>
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 mr-[50px]">
            <DropdownMenuItem className="text-red-800">
                <IoLogOut size={32}/>
                <p className="font-bold font-lg ml-1">Log out</p>
            </DropdownMenuItem>

            <DropdownMenuItem>
                <BiSolidBookAdd size={28}/>
                <p className="font-bold font-lg ml-1">Add book</p>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}