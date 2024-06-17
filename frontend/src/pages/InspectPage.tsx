import { Navbar } from "@/components/Navbar";
import { BookDisplaySkeleton } from "@/components/Display/BookDisplaySkeleton";
import { BookDisplayImage } from "@/components/Display/BookDisplayImage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { GoogleRating } from "@/components/Interactions/GoogleRating";
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
// @ts-ignore
import { fetcher } from "@/hooks/fetcher";
import { getIsbnLink } from "@/utils/isbnApi";
import useSWR from "swr";
import { useGetBorrowsNotReturnedByIsbnAndUserId } from "@/hooks/borrow/useGetBorrowsNotReturnedByUserIdAndIsbn";

import { VolumeList } from "@/types/googleBooksAPI";

function validateBookData(data: VolumeList): boolean {
  return data != undefined && data.items && data.items.length > 0;
}

export const InspectPage: React.FC = () => {
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
    isLoading: isCurrentlyGettingIsbnInSupabase,
    isError: isErrorFindingIsbnInSupabase,
  } = useGetBookById(isbnSearch);

  const googleBooksDataAPI: VolumeList = googleBooksData;
  const isbnExistInTheWorld: boolean = !!error;

  const userId = loggedInUserData?.userMetaData[0]?.user_id;
  const bookId = bookDataFoundByIsbn ? bookDataFoundByIsbn[0]?.id : null;

  const { DialogComponent, openDialog, isReportingBook } =
    useBookReportDialog(bookId);
  const { mutateAsync: returnBook, isPending: isReturningBook } = useReturnBook(
    isbnSearch,
    userId
  );
  const { mutateAsync: borrowBook, isPending: isBorrowingBook } = useBorrowBook(
    isbnSearch,
    userId
  );

  const { data: borrowsOfBookCurrentlyDisplayed } =
    useGetBorrowsNotReturnedByIsbnAndUserId(isbnSearch, userId);

  const userHasBookCurrentlyDisplayed =
    borrowsOfBookCurrentlyDisplayed &&
    borrowsOfBookCurrentlyDisplayed.length > 0;

  const pageIsCurrentlyLoading =
    isCurrentlyGettingIsbnInSupabase || isCurrentlyFetchingGoogleBooksAPI;

  const doNotDisplayBook =
    !pageIsCurrentlyLoading &&
    (isErrorFindingIsbnInSupabase ||
      !bookDataFoundByIsbn ||
      bookDataFoundByIsbn.length === 0 ||
      isbnExistInTheWorld ||
      !validateBookData(googleBooksDataAPI));

  const volumeInfo = googleBooksDataAPI?.items[0]?.volumeInfo;
  const title = volumeInfo?.title;
  const imageLinks = volumeInfo?.imageLinks;
  const authors = volumeInfo?.authors;
  const description = volumeInfo?.description;
  const averageRating = volumeInfo?.averageRating;
  const categories = volumeInfo?.categories;

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950 font-outfit">
      <Navbar />
      {doNotDisplayBook ? (
        <Error errorMessage="Failed to find book with isbn" returnHome={true} />
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
            <h3 className="text-2xl text-gray-300">By: {authors}</h3>
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
                    const currentDate = new Date();
                    const formattedCurrentDate = currentDate
                      .toISOString()
                      .split("T")[0];
                    const futureDate = new Date(
                      currentDate.setDate(currentDate.getDate() + 7)
                    );
                    const formattedFutureDate = futureDate
                      .toISOString()
                      .split("T")[0];
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
            <div className="flex justify-start items-center gap-5">
              <Voting />
              <Separator
                orientation="vertical"
                className="h-[60px] opacity-25"
              />
              <GoogleRating rating={averageRating} />
              <Separator
                orientation="vertical"
                className="h-[60px] opacity-25"
              />
              <h1>{categories}</h1>
            </div>
          </div>
        </div>
      )}
      {!doNotDisplayBook && DialogComponent}
    </div>
  );
};
