import { cn } from "@/lib/utils";

interface BookData {
  children: string;
  author?: string;
  image?: string;
}

export const BookDisplay = ({ author, image, children }: BookData) => {
  return (
    <div
      className={cn(
        "w-[250px] h-[375px] m-4 relative",
        "bg-black overflow-clip rounded-3xl font-outfit shadow-lg shadow-gray-900",
        "flex flex-col justify-end items-center"
      )}
    >
      <img src={image} className="w-full h-full absolute fill-gray-400" />

      <div
        className={cn(
          "w-full h-full bg-gradient-to-t from-blue-950 absolute",
          image ? "to-transparent" : "to-teal-800"
        )}
      >
        {!image ? (
          <p className="text-white font-bold text-3xl text-center mt-[75px] opacity-50">
            Book cover not found
          </p>
        ) : (
          <></>
        )}
      </div>

      <div className="p-5 absolute w-full">
        <h1 className="text-xl font-bold mt-2 text-white">{children}</h1>
        <p className="text-lg mb-1 italic text-white">By: {author}</p>
      </div>
    </div>
  );
};
