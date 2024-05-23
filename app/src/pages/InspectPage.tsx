import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { BookDisplaySkeleton } from "@/components/BookDisplaySkeleton";
import { BookDisplayImage } from "@/components/BookDisplayImage";

// import { useParams } from "react-router-dom";
// @ts-ignore comment
import { fetcher } from "@/hooks/fetcher";
import { getIsbnLink } from "@/utils/isbnApi";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import useSWR from "swr";

// type any because it is google api request
function checkDataResults(data: any) {
  if (data == undefined) return false;
  if (data.items.length <= 0) return false;
  return true;
}

/*
TODO List:
The toast that appears when you add a book should link to the book or/and state the name of the book (SAFI)

Have an image of the book towards the right of the add book form (SAFI)

Add the edit book book (SAFI)

Add the return book works (SAFI)

Add reports (SAFI)

When the user is adding a isbn the user shouldn't have to wait to see that the isbn does not exist or is already being used

The admin page should only allow admins to vist the page (ISAAC)

Add the borrowing (ISAAC)(teacher does not have to approved) (there's a limit to the amount of books you can borrow) (if the user has more than 1 book missing the user can't buy)
*/

export const InspectPage = () => {
  const { bookInspectIsbn } = useParams();
  const isbnSearch = bookInspectIsbn?.split("-").join("");

  const { data, isLoading, error } = useSWR(getIsbnLink(isbnSearch), fetcher);

  if (!checkDataResults(data) || error) {
    return;
  }

  const { title, imageLinks, authors, description } =
    data?.items[0]?.volumeInfo;

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950">
      <Navbar />

      <div className="full-center p-5">
        <div className="w-1/4 full-center flex-col">
          {isLoading || error || !imageLinks.thumbnail ? (
            <BookDisplaySkeleton />
          ) : (
            <BookDisplayImage src={imageLinks.thumbnail} />
          )}
          ;
        </div>

        <div className="text-white w-1/2">
          <h1 className="font-bold text-4xl">{title}</h1>
          <h3 className="italic text-2xl">
            By: {authors ? authors[0] : "Unknown"}
          </h3>

          <p className="text-md text-gray-500 my-[50px]">
            {description || "No description"}
          </p>

          <div className="flex items-center justify-left">
            <Button variant="secondary" className="text-lg w-1/4 mr-3 py-6">
              Borrow
            </Button>
            <Button variant="secondary" className="text-lg w-1/4 mr-3 py-6">
              Return
            </Button>
            <Button
              className={cn(
                "text-white text-lg",
                "py-6 mr-3 w-1/4",
                "bg-red-900 hover:text-black"
              )}
              variant="secondary"
            >
              Report Missing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
