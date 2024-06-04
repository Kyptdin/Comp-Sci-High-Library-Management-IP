import { BookDisplaySkeleton } from "@/components/BookDisplaySkeleton";
import { BookDisplay } from "@/components/BookDisplay";
import { Navbar } from "@/components/Navbar";
import { Error } from "@/components/Error";

import { useParams, Link } from "react-router-dom";
import { useSearchBookBySimilarTitle } from "@/hooks/book/useSearchBookBySimilarTitle";
import { cn } from "@/lib/utils";

/**
 * This component displays search results based on a given search query.
 * It fetches and displays books that match or are similar to the search query.
 *
 * @returns JSX element representing the search results page.
 */

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

      <div
        className={cn(
          "grid p-5 grid-cols-1 gap-0",
          "2xl:grid-cols-6 2xl:gap-7",
          "xl:grid-cols-5 xl:gap-5",
          "md:grid-cols-3 md:gap-2",
          "sm:grid-cols-2 sm:gap-0",
          "xs:grid-cols-1 xs:gap-0"
        )}
      >
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
              <Link to={inspectPageLink} key={key}>
                <BookDisplay author={finalAuthorName} image={image}>
                  {title}
                </BookDisplay>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
