import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const AddBooksAdminPage = () => {
  const [bookIsbn, setBookIsbn] = useState<string>("");
  const [totalCopies, setTotalCopies] = useState<number>(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Submitting");
  };

  return (
    <div className="p-4 w-[80%]">
      <h2 className="text-xl mb-2 text-white">Add Book</h2>
      <form className="flex flex-col gap-4 w-1/3" onSubmit={onSubmit}>
        <Input
          value={bookIsbn}
          onChange={(e) => setBookIsbn(e.target.value)}
          type="text"
          placeholder="Book isbn"
          className={cn(
            "focus:outline-none",
            "rounded-md w-full py-2 px-5",
            "duration-50 transition ease-out"
          )}
        />
        <Input
          onChange={(e) => setTotalCopies(parseInt(e.target.value))}
          value={totalCopies}
          type="number"
          placeholder="Total amount of copies"
          className={cn(
            "focus:outline-none",
            "rounded-md w-full py-2 px-5",
            "duration-50 transition ease-out"
          )}
        />
        <Button className="bg-teal-700 hover:bg-teal-800 transition duration-200">
          Hi
        </Button>
      </form>
    </div>
  );
};
