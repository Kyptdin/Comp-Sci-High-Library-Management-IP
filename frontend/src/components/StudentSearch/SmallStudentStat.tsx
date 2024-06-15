import { cn } from '@/lib/utils'
import React from 'react'

interface SmallStudentStatProp {
    statName: string,
    statNumber?: string | number,
    className?: string
}

export const SmallStudentStat = ({
    statName,
    statNumber,
    className
}: SmallStudentStatProp) => {
    return (
        <p className={cn(
            "p-1 px-4 mx-1 rounded bg-white", 
            className
        )}>
            {statName}:{" "}

            <span className="font-bold">
                {statNumber}
            </span>
        </p>
    )
}
