import { FaTruckLoading } from "react-icons/fa";

export const Loading = () => {
    return <div className="w-full h-[75vh] flex justify-center items-center">
        <FaTruckLoading size={50} color="white" className="mr-5"/>
        <p className="text-3xl text-white font-outfit">Content is loading.</p>
    </div>
}