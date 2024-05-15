import { cn } from "@/lib/utils";

export const AddBooksAdminPage = () => {
  return (
    <div className="p-4 w-[80%]">
      <h2 className="text-xl mb-2 text-white">Add Book</h2>
      <form className="flex flex-col gap-4 w-1/3">
        <input
          type="text"
          placeholder="Book isbn"
          className={cn(
            "focus:outline-none",
            "rounded-md w-full py-2 px-5",
            "duration-50 transition ease-out"
          )}
        />
        <input
          type="number"
          placeholder="Total amount of copies"
          className={cn(
            "focus:outline-none",
            "rounded-md w-full py-2 px-5",
            "duration-50 transition ease-out"
          )}
        />
      </form>
    </div>
  );
};
