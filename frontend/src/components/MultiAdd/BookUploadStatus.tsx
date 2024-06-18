import { MdAccessTimeFilled } from "react-icons/md";
import { RiLoader4Line } from "react-icons/ri";
import { TbSquareCheckFilled } from "react-icons/tb";
import { TiWarning } from "react-icons/ti";

export const BookUploadStatus = ({uploadStatus}: {
    uploadStatus: string
}) => {
  return (
    <div>
        {uploadStatus == "loading" &&
            <RiLoader4Line size={28} className="animate-spin opacity-50"/>}
        {uploadStatus == "success" && 
            <TbSquareCheckFilled size={28} className="text-green-600"/>}
        {uploadStatus == "failure" && 
            <TiWarning size={28} className="text-red-700"/>}
        {uploadStatus == "idle" && 
            <MdAccessTimeFilled size={28} className="text-blue-500 animate-pulse"/>}
    </div>
  )
}
