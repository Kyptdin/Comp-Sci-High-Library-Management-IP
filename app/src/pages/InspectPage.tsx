import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { BookDisplaySkeleton } from "@/components/BookDisplaySkeleton";
import { BookDisplayImage } from "@/components/BookDisplayImage";
// @ts-ignore comment
import { fetcher } from "@/hooks/fetcher";
import { getIsbnLink } from "@/utils/isbnApi";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import useSWR from "swr";
import { useGetLoggedInUser } from "@/hooks/user/useGetLoggedInUser";
import { useReturnBook } from "@/hooks/borrow/useReturnBook";
import { useBookReportDialog } from "@/hooks/book/useBookReportDialog";
import { useBorrowBook } from "@/hooks/borrow/useBorrowBook";

import { v4 as uuidv4 } from "uuid";
import { useGetBookById } from "@/hooks/book/useGetBookById";

// type any because it is google api request
function checkDataResults(data: any) {
  if (data == undefined) return false;
  if (data.items.length <= 0) return false;
  return true;
}

/*
TODO::
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
  const { data: loggedInUserData } = useGetLoggedInUser();
  const { bookInspectIsbn } = useParams();
  const isbnSearch = bookInspectIsbn?.split("-").join("");
  const { data, isLoading, error } = useSWR(getIsbnLink(isbnSearch), fetcher);
  const userId = loggedInUserData?.userMetaData[0].user_id;
  const { DialogComponent, openDialog, isReportingBook } =
    useBookReportDialog(); //Used for reporting
  const { mutateAsync: returnBook, isPending: isReturningBook } =
    useReturnBook();
  const { mutateAsync: borrowBook, isPending: isBorrowingBook } =
    useBorrowBook();
  const { isError: isbnDoesNotExistWithinSupabase } =
    useGetBookById(isbnSearch);

  if (!checkDataResults(data) || error || isbnDoesNotExistWithinSupabase) {
    return null;
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
            <Button
              variant="secondary"
              className="text-lg w-1/4 mr-3 py-6"
              disabled={isBorrowingBook}
              onClick={() => {
                if (!isbnSearch || !userId) return;
                // Create a new Date object for the current date
                const currentDate = new Date();

                // Get the year, month, and day components for the current date
                const currentYear = currentDate.getFullYear();
                // Adding 1 to getMonth because it returns zero-based month (0 for January)
                const currentMonth = currentDate.getMonth() + 1;
                const currentDay = currentDate.getDate();

                // Format the current date as "year, month, day"
                const formattedCurrentDate = `${currentYear}-${currentMonth}-${currentDay}`;

                // Calculate the date for 7 days in the future
                currentDate.setDate(currentDate.getDate() + 7);

                // Get the year, month, and day components for the future date
                const futureYear = currentDate.getFullYear();
                // Adding 1 to getMonth because it returns zero-based month (0 for January)
                const futureMonth = currentDate.getMonth() + 1;
                const futureDay = currentDate.getDate();

                // Format the future date as "year, month, day"
                const formattedFutureDate = `${futureYear}-${futureMonth}-${futureDay}`;

                borrowBook({
                  borrow_id: uuidv4(),
                  damaged: false,
                  returned: false,
                  isbn: isbnSearch,
                  user: userId,
                  return_due_date: formattedFutureDate,
                  date_borrowed: formattedCurrentDate,
                });
              }}
            >
              Borrow
            </Button>

            <Button
              variant="secondary"
              className="text-lg w-1/4 mr-3 py-6"
              disabled={isReturningBook}
              onClick={() => {
                returnBook({ userId, isbn: isbnSearch });
              }}
            >
              Return
            </Button>

            <Button
              className={cn(
                "text-white text-lg",
                "py-6 mr-3 w-1/4",
                "bg-red-900 hover:text-black"
              )}
              variant="secondary"
              disabled={isReportingBook}
              onClick={openDialog}
            >
              Report Missing
            </Button>
          </div>
        </div>
      </div>
      {DialogComponent}
    </div>
  );
};
