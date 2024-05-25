import { cn } from "@/lib/utils";

export const BookDisplayImage = ({ src, className } : {
    src?: string
    className?: string
}) => {
  return (
    <div
      className={cn(
        "w-[325px] h-[500px] m-4 relative",
        "bg-black overflow-clip rounded-3xl font-outfit shadow-lg shadow-gray-900",
        "flex flex-col justify-end items-center",
        className
      )}
    >
      <img src={src} className="w-full h-full absolute fill-gray-400" />

      <div className="w-full h-full bg-gradient-to-t from-blue-950 absolute"></div>
    </div>
  );
};
