import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { useCreateBook } from "@/hooks/book/useCreateBook";

import useSWRMutation from "swr/mutation";
import { isbnApiLink, fetchBookFromIsbn } from "@/utils/isbnApi";

export const AddBooksAdminPage = () => {
  const { mutateAsync: createBook } = useCreateBook();
  const [bookIsbn, setBookIsbn] = useState<string>("");
  const [totalCopies, setTotalCopies] = useState<number>(0);
  const { toast } = useToast();
  const { isMutating, trigger } = useSWRMutation(
    isbnApiLink,
    fetchBookFromIsbn
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultData = await trigger(bookIsbn);

    if (resultData?.totalItems <= 0) {
      toast({
        title: "Failed to add book.",
        description: `Book ${bookIsbn} could not be found.`,
        variant: "destructive",
      });
      return;
    }

    try {
      await createBook({
        id: bookIsbn,
        total_copies: totalCopies,
      });
    } catch (error) {
      const errorObj = error as Error;
      const errorMessage = errorObj.message.includes("duplicate")
        ? "The book already is in the system."
        : errorObj.message.includes("duplicate");
      toast({
        title: "Failed to add book.",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 w-[80%] font-outfit text-white full-center flex-col justify-start">
      <h2 className="text-4xl mb-5">Add Book</h2>
      <Separator className="w-1/3 bg-gray-700" />

      <form
        className="flex flex-col gap-4 w-1/3 p-5 rounded-lg"
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

        <Button
          className="transition duration-200"
          disabled={isMutating}
          variant="secondary"
        >
          <FaFileUpload size={20} className="mr-2" />
          Add book
        </Button>
        <p className="text-xs text-gray-600 flex">
          Double check your information before submitting!
        </p>
      </form>
    </div>
  );
};
