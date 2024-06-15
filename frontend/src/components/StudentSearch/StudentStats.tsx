import { cn } from "@/lib/utils"

interface StudentStatsProp {
    statName: string,
    statNumber: string | number | undefined,
    className?: string | undefined
}

export const StudentStats = ({
    statName,
    statNumber,
    className
}: StudentStatsProp) => {
    return (
        <div className={cn(
            "px-2 py-1 full-center flex-col",
            "border-2 border-gray-400 rounded",
            "bg-gray-200 text-black",
            className
        )}>
            <h3 className="text-sm">{statName}</h3>
            <h1 className="text-xl"> {statNumber}</h1> 
        </div>
    );
}
