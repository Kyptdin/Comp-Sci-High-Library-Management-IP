import { FaTruckLoading } from "react-icons/fa";

export const Loading = () => {
    return <div className="w-full h-[50vh] flex justify-center items-center flex-col">
        <FaTruckLoading size={50} color="white" className="my-5"/>
        <p className="text-3xl text-white font-outfit">Content is loading.</p>
    </div>
}