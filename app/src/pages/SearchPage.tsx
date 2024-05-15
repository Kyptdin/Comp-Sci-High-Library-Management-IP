import { BookDisplay } from "@/components/BookDisplay";
import { Navbar } from "@/components/Navbar";
import { Error } from "@/components/Error";
import { BookDisplaySkeleton } from "@/components/BookDisplaySkeleton";

import { useParams } from "react-router-dom";
// @ts-expect-error comment
import { fetcher } from "@/hooks/fetcher";
import useSWR from "swr";

const openLibraryUrl = "https://openlibrary.org/search.json?title=";

export const SearchPage = () => {
  const { searchQuery } = useParams();
  const filteredSearchParams = searchQuery
    ?.split(" ")
    .join("+")
    .toLocaleLowerCase();
  const fetchingUrl = openLibraryUrl + filteredSearchParams;
  const { error, isLoading, data } = useSWR(fetchingUrl, fetcher);
  const numberOfBooks = isLoading
    ? "loading"
    : !data?.numFound
    ? "No"
    : data?.numFound;

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950">
      <Navbar />

      <p className="text-3xl text-white font-outfit my-3 ml-[40px]">
        {numberOfBooks} results found for "{searchQuery}"
      </p>

      {error ? <Error /> : <></>}
      {isLoading ? <BookDisplaySkeleton /> : <></>}

      <div className="grid grid-cols-5 gap-1 p-5">
        {data ? (
          data.docs.map((bookData: any, key: number) => {
            let { title, author_name, isbn } = bookData;

            author_name = author_name ? author_name[0] : "Unknown";
            const imageLoaded = isbn
              ? `https://covers.openlibrary.org/b/isbn/${isbn[0]}-L.jpg`
              : "/blank_book.jpg";

          console.log(isbn);

          return (<BookDisplay
            author={author_name}
            isAvaliable={true}
            image={imageLoaded}
            key={key}
          >{title}</BookDisplay>);
      </div> 
    </div>
  );
};
