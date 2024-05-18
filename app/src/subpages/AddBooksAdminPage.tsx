import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { useCreateBook } from "@/hooks/book/useCreateBook";

export const AddBooksAdminPage = () => {
  const { mutateAsync } = useCreateBook();
  const [bookIsbn, setBookIsbn] = useState<string>("");
  const [totalCopies, setTotalCopies] = useState<number>(0);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync({ id: bookIsbn, total_copies: totalCopies });
  };

  return (
    <div className="p-4 w-[80%] font-outfit text-white full-center flex-col justify-start">
      <h2 className="text-3xl mb-2 font-bold">Add Book</h2>
      <form
        className="flex flex-col gap-4 w-1/3 p-5 bg-teal-900 shadow-lg shadow-teal-950 rounded-lg"
        onSubmit={onSubmit}
      >
        <h2>Enter book ISBN number</h2>
        <Input
          value={bookIsbn}
          onChange={(e) => setBookIsbn(e.target.value)}
          type="text"
          placeholder="Book ISBN number"
          required={true}
          className={cn(
            "focus:outline-none text-black",
            "rounded-md w-full py-2 px-5",
            "duration-50 transition ease-out"
          )}
        />
        <p className="text-sm text-teal-600 flex">
          <FaInfoCircle size={20} className="mr-2" />
          The ISBN number of the book is located above the bar-code in the back
          of the book.
        </p>

        <h2>Number of copies</h2>
        <Input
          onChange={(e) => setTotalCopies(parseInt(e.target.value))}
          value={totalCopies}
          type="number"
          placeholder="Total amount of copies"
          required={true}
          className={cn(
            "focus:outline-none text-black",
            "rounded-md w-full py-2 px-5",
            "duration-50 transition ease-out"
          )}
        />
        <p className="text-sm text-teal-600 flex">
          <FaInfoCircle size={20} className="mr-2" />
          The number of copies can be edited later. This tells you how many
          copies of the book exist in the entire school.
        </p>

        <Button className="transition duration-200" variant="secondary">
          <FaFileUpload size={20} className="mr-2" />
          Add book
        </Button>
      </form>
    </div>
  );
};
