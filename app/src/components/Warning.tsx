import { FileWarningIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export const Warning = ({children, className} : {
    children: string,
    className?: string
}) => {
    return <div className={cn("bg-red-800 px-3 py-2 rounded flex shadow-lg", className)}>
        <div className="mr-2">
            <FileWarningIcon color="white"/>
        </div>
        <p className="text-white font-bold">{children}</p>
    </div>;
}