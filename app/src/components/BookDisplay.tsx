import { Button } from "@/components/ui/button"

import { MdOutlineMoreHoriz } from "react-icons/md";

type bookData = {
    children: string,
    image?: string,
    isAvaliable?: boolean
};

import { Warning } from "./Warning";

export const BookDisplay = ({children, image, isAvaliable = true} : bookData) => {
    return <div className="w-[350px] shadow-md m-3 rounded bg-white">
        <div className="h-1/2 rounded overflow-clip">
            <img src={image} className="w-full -translate-y-1/2 m-0"/>
        </div>

        <div className="p-5">
            <h1 className="text-lg font-bold my-2">{children}</h1>

            {!isAvaliable ? 
            <Warning>NOT AVALIABLE</Warning> :
            <Button className="w-full font-bold shadow-md">BORROW</Button>}

            <div className="flex justify-end items-center w-full">
                <Button className="mt-2 text-lg shadow-md" variant="outline">
                    <MdOutlineMoreHoriz/>
                </Button>
            </div>
        </div>
  </div>
}