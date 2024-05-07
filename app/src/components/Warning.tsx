import { FileWarningIcon } from "lucide-react";

export const Warning = ({children} : {children: string}) => {
    return <div className="bg-orange-600 px-3 py-2 rounded flex shadow-lg">
        <div className="mr-2">
            <FileWarningIcon color="white"/>
        </div>
        <p className="text-white font-bold">{children}</p>
    </div>;
}