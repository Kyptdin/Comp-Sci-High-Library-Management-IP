import { GiTerror } from "react-icons/gi";

import { cn } from "@/lib/utils";

export const Warning = ({children, className} : {
    children: string,
    className?: string
}) => {
    return <div className={cn(
        "bg-red-900 px-3 py-[8px] rounded shadow-md shadow-red-950",
        "flex justify-center items-center",
        className
    )}>
        <div className="mr-2">
            <GiTerror color="white" size={30}/>
        </div>

        <p className="text-white font-bold">{children}</p>
    </div>;
}