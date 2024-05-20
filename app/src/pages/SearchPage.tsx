import { BookDisplay } from "@/components/BookDisplay";
import { Navbar } from "@/components/Navbar";
import { Error } from "@/components/Error";
import { BookDisplaySkeleton } from "@/components/BookDisplaySkeleton";

import { useParams } from "react-router-dom";
import { useSearchBookBySimilarTitle } from "@/hooks/book/useSearchBookBySimilarTitle";

export const SearchPage = () => {
  const { searchQuery } = useParams();
  const filteredSearchParams = searchQuery
    ?.split(" ")
    .join("+")
    .toLocaleLowerCase();
  const {
    data: booksForSearchedQuery,
    isLoading,
    isError,
  } = useSearchBookBySimilarTitle(filteredSearchParams);
  const numberOfBooks = isLoading
    ? "loading"
    : !booksForSearchedQuery || booksForSearchedQuery.length < 1
    ? "No"
    : booksForSearchedQuery.length;
  const arrayLength = 8;
  // This string is created because if the search result only has 1 book, then the website should say "result" instead of "results".
  const resultString = numberOfBooks === 1 ? "result" : "results";
  const emptyArr = Array.from({ length: arrayLength }, (_, index) => index);

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950">
      <Navbar />
      <p className="text-3xl text-white font-outfit my-3 ml-[40px]">
        {numberOfBooks} {resultString} found for "{searchQuery}"
      </p>

      {isError && <Error />}
      {isLoading && (
        <div className="grid grid-cols-4 ">
          {emptyArr.map((_, index) => {
            return <BookDisplaySkeleton key={index} />;
          })}
        </div>
      )}

      <div className="grid grid-cols-4 gap-1 p-5">
        {booksForSearchedQuery &&
          booksForSearchedQuery.map((bookData, key: number) => {
            const {
              title,
              googleBooksApiData: { authors, image },
            } = bookData;
            const finalAuthorName =
              authors.length > 0 && authors ? authors : "Unknown";

            return (
              <BookDisplay
                author={finalAuthorName}
                isAvaliable={true}
                image={image}
                key={key}
              >
                {title}
              </BookDisplay>
            );
          })}
      </div>
    </div>
  );
};
