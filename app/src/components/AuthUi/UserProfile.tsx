import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { IoLogOut } from "react-icons/io5";
import { BiSolidBookAdd } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogout } from "@/hooks/useLogout";
import { cn } from "@/lib/utils";

interface Props {
  profileImageUrl: string | null;
}

export const UserProfile = ({ profileImageUrl }: Props) => {
  const { mutateAsync } = useLogout();

  if (!profileImageUrl) {
    return <Skeleton className="w-[60px] h-[60px] rounded-2xl" />;
  }

  async function logout() {
    await mutateAsync();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "mt-3 w-[60px] h-[60px] p-0",
            "rounded-2xl border-[3px] border-gray-600",
            "hover:cursor-pointer"
          )}
        >
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
            logout();
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
