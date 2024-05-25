import { BookDisplaySkeleton } from "@/components/BookDisplaySkeleton";
import { BookDisplay } from "@/components/BookDisplay";
import { Navbar } from "@/components/Navbar";
import { Error } from "@/components/Error";

import { useParams } from "react-router-dom";
import { useSearchBookBySimilarTitle } from "@/hooks/book/useSearchBookBySimilarTitle";
import { Link } from "react-router-dom";

export const SearchPage = () => {
  const { searchQuery } = useParams();
  const filteredSearchParams = searchQuery;
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

      <div className="grid grid-cols-5 p-5">
        {booksForSearchedQuery &&
          booksForSearchedQuery.map((bookData, key: number) => {
            const {
              title,
              googleBooksApiData: { authors, image },
            } = bookData;

            const finalAuthorName =
              authors && authors?.length > 0 ? authors : "Unknown";
            const inspectPageLink = `/inspect/${bookData.id}`;

            return (
              <Link to={inspectPageLink}>
                <BookDisplay author={finalAuthorName} image={image} key={key}>
                  {title}
                </BookDisplay>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
