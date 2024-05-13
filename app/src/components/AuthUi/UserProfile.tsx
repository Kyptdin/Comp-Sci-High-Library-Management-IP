import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { IoLogOut } from "react-icons/io5";
import { BiSolidBookAdd } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import { logoutUser } from "@/services/auth";
import { cn } from "@/lib/utils";

interface Props {
  profileImageUrl: string | null;
  resetUserState: () => void;
}

export const UserProfile = ({ profileImageUrl, resetUserState }: Props) => {
  if (!profileImageUrl) {
    return <Skeleton className="w-[60px] h-[60px] rounded-2xl"/>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={cn(
          "mt-3 w-[60px] h-[60px] p-0", 
          "rounded-2xl border-[3px] border-gray-600",
          "hover:cursor-pointer"
        )}>
          <img
            src={profileImageUrl}
            alt="profile image"
            className="w-full h-full rounded-xl"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mr-[50px]">
        <DropdownMenuItem
          className="text-red-800"
          onClick={() => {
            logoutUser();
            resetUserState();
          }}
        >
          <IoLogOut size={32} />
          <p className="font-bold font-lg ml-1">Log out</p>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <BiSolidBookAdd size={28} />
          <p className="font-bold font-lg ml-1">Add book</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
