import { Button } from "@/components/ui/button";
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { MdOutlineMoreHoriz } from "react-icons/md";

import { ReactNode } from "react";

export const BookHamburger = ({children}: {children?: ReactNode}) => {
    return (<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className="mt-3" variant="link">
                <MdOutlineMoreHoriz size={35} color="white"/>
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
            {children}
        </DropdownMenuContent>
    </DropdownMenu>);
}