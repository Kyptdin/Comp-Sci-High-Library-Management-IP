import { Navbar } from "@/components/Navbar";
import { BookDisplaySkeleton } from "@/components/Display/BookDisplaySkeleton";
import { BookDisplayImage } from "@/components/Display/BookDisplayImage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Voting } from "@/components/Interactions/Voting";
import { Button } from "@/components/ui/button";
import { Error } from "@/components/Error";
import { cn } from "@/lib/utils";

import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useReturnBook } from "@/hooks/borrow/useReturnBook";
import { useGetLoggedInUser } from "@/hooks/user/useGetLoggedInUser";
import { useBookReportDialog } from "@/hooks/book/useBookReportDialog";
import { useBorrowBook } from "@/hooks/borrow/useBorrowBook";
import { useGetBookById } from "@/hooks/book/useGetBookById";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore comment
import { fetcher } from "@/hooks/fetcher";
import { getIsbnLink } from "@/utils/isbnApi";
import useSWR from "swr";
import { 
  useGetBorrowsNotReturnedByIsbnAndUserId
} from "@/hooks/borrow/useGetBorrowsNotReturnedByUserIdAndIsbn";

import { VolumeList } from "@/types/googleBooksAPI";

function validateBookData(data: VolumeList) {
  if (data == undefined) return false;
  if (!data?.items || data?.items?.length <= 0) return false;
  return true;
}
/**
 * This component is used to display detailed information about a book and provide interaction options like borrowing, returning, and reporting missing books.
 * It fetches data from the Google Books API and the Supabase database based on the provided ISBN. Users can borrow books if available, return borrowed books, and report missing books.
 *
 * @returns JSX element representing the book inspection page with detailed book information and interaction options.
 */
export const InspectPage = () => {
  const { data: loggedInUserData } = useGetLoggedInUser();

  const { bookInspectIsbn } = useParams();
  const isbnSearch = bookInspectIsbn?.split("-").join("");

  const {
    data: googleBooksData,
    isLoading: isCurrentlyFetchingGoogleBooksAPI,
    error,
  } = useSWR(getIsbnLink(isbnSearch), fetcher);
  const {
    data: bookDataFoundByIsbn,
    isLoading: isCurrnetlyGettingIsbnInSupabase,
    isError: isErrrorFindingIsbnInSupabase,
  } = useGetBookById(isbnSearch);

  // this is to re-define it's type from any to certain type
  const googleBooksDataAPI: VolumeList = googleBooksData;
  const isbnExistInTheWorld: boolean = error;

  const userId = loggedInUserData?.userMetaData[0].user_id;
  const bookId = bookDataFoundByIsbn ? bookDataFoundByIsbn[0].id : null;

  const { 
    DialogComponent, 
    openDialog, 
    isReportingBook 
  } = useBookReportDialog(bookId); //Used for reporting
  const { 
    mutateAsync: returnBook, 
    isPending: isReturningBook 
  } = useReturnBook(isbnSearch, userId);
  const { 
    mutateAsync: borrowBook, 
    isPending: isBorrowingBook 
  } = useBorrowBook(isbnSearch, userId);

  const { data: borrowsOfBookCurrentlyDisplayed } =
    useGetBorrowsNotReturnedByIsbnAndUserId(isbnSearch, userId);

  const userHasBookCurrentlyDisplayed =
    borrowsOfBookCurrentlyDisplayed !== null &&
    borrowsOfBookCurrentlyDisplayed !== undefined &&
    borrowsOfBookCurrentlyDisplayed.length > 0;
  const pageIsCurrentlyLoading =
    isCurrnetlyGettingIsbnInSupabase || isCurrentlyFetchingGoogleBooksAPI;

  const doNotDisplayBook =
    !pageIsCurrentlyLoading &&
    (isErrrorFindingIsbnInSupabase ||
      !bookDataFoundByIsbn ||
      bookDataFoundByIsbn.length === 0 ||
      isbnExistInTheWorld ||
      !validateBookData(googleBooksDataAPI));

  const volumeInfo = googleBooksDataAPI?.items[0].volumeInfo;
  const title = volumeInfo?.title;
  const imageLinks = volumeInfo?.imageLinks;
  const authors = volumeInfo?.authors;
  const description = volumeInfo?.description;

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950">
      <Navbar />

      {doNotDisplayBook ? (
        <Error 
          errorMessage="Failed to find book with isbn"
          returnHome={true}
         />
      ) : (
        <div className="full-center p-5">
          <div className="w-1/4 full-center flex-col">
            {pageIsCurrentlyLoading || !imageLinks ? (
              <BookDisplaySkeleton />
            ) : (
              <BookDisplayImage src={imageLinks?.thumbnail} />
            )}
          </div>

          <div className="text-white w-1/2 p-3">
            <h1 className="font-bold text-4xl">{title}</h1>
            <h3 className="text-2xl text-gray-300">
              By: {authors ? authors[0] : "Unknown"}
            </h3>

            <ScrollArea
              className={cn(
                "text-md text-gray-500",
                "my-[25px] pr-[20px] w-full h-[200px]"
              )}
            >
              {description || "No description"}
            </ScrollArea>

            <div className="flex items-center justify-left">
              {!userHasBookCurrentlyDisplayed && (
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
              )}

              {userHasBookCurrentlyDisplayed && (
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
              )}

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

            <Voting/>
          </div>
        </div>
      )}

      {!doNotDisplayBook && DialogComponent}
    </div>
  );
};
