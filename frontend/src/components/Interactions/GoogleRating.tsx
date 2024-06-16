import { cn } from '@/lib/utils';
import React from 'react'

import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";

export const GoogleRating = ({ rating  = 0 }: {
    rating?: number | undefined
}) => {
    const starMapping = Array.from(Array(5), (_, index) => {
        return ((index + 1) <= rating);
    });

    return <div className="text-white font-outfit p-2">
        <h1 className="m-2 font-bold text-center">
            {rating == 0 ? "Rating unavaliable" : "Google rating:"}
        </h1>

        <div className={cn(
            "full-center text-yellow-500 text-3xl",
            (rating == 0) ? "animate-pulse" : "" 
        )}>
            {starMapping.map((starFilled: boolean, key: number) => {
                if (starFilled) {
                    return (<TiStarFullOutline key={key}/>);
                }
                return (<TiStarOutline key={key}/>);
            })}
        </div>
    </div>
}
