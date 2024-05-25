import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { EditBookDisplay } from "@/components/EditBookDisplay";
import { useSearchBookBySimilarTitle } from "@/hooks/book/useSearchBookBySimilarTitle";
import { useState } from "react";

export const EditBooksAdminPage = () => {
  const [bookNameQuery, setBookNameQuery] = useState<string>("");
  const { data: bookDataSearchedByTitle } =
    useSearchBookBySimilarTitle(bookNameQuery);

  return (
    <div className="text-white w-[80%] p-4">
      <div className="p-4">
        <h1 className="text-4xl">Edit Books</h1>
        <Separator className="w-full bg-gray-500 my-5" />

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

      <div className="px-4 grid grid-cols-2">
        {bookDataSearchedByTitle &&
          bookDataSearchedByTitle.map((bookData) => {
            return (
              <EditBookDisplay
                isbn="1338596705"
                title={bookData.title}
                bookImage={bookData.googleBooksApiData.image}
              />
            );
          })}
      </div>
    </div>
  );
};
