import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { EditBookDisplay } from "@/components/EditBookDisplay";
import { useSearchBookBySimilarTitle } from "@/hooks/book/useSearchBookBySimilarTitle";
import { useState } from "react";

/**
 * Component for the admin page to edit books. Allows searching for books by title
 * and displays a list of books that match the search query for editing.
 *
 * @returns JSX.Element
 */
export const EditBooksAdminPage = () => {
  // State to hold the search query for book names
  const [bookNameQuery, setBookNameQuery] = useState<string>("");

  // Fetch book data based on the search query
  const { data: bookDataSearchedByTitle } =
    useSearchBookBySimilarTitle(bookNameQuery);

  return (
    <div className="text-white w-[80%] p-4">
      <div className="p-4">
        <h1 className="text-4xl">Edit Books</h1>
        <Separator className="w-full bg-gray-500 my-5" />

        {/* Input field to search for books by title */}
        <Input
          value={bookNameQuery}
          onChange={(e) => {
            setBookNameQuery(e.target.value);
          }}
          type="text"
          placeholder="Enter book name"
          className="w-full px-4 py-2 mb-4 rounded text-lg text-black"
        />
      </div>

      {/* Display the list of books matching the search query */}
      <div className="px-4 grid grid-cols-2">
        {bookDataSearchedByTitle &&
          bookDataSearchedByTitle.map((bookData) => {
            return (
              <EditBookDisplay
                key={bookData.id}
                titleQuery={bookNameQuery}
                isbn={bookData.id}
                title={bookData.title}
                bookImage={bookData.googleBooksApiData.image}
              />
            );
          })}
      </div>
    </div>
  );
};
