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

import { useParams } from "react-router-dom";
import { useBookReportDialog } from "@/hooks/book/useBookReportDialog";
import { useGetBookById } from "@/hooks/book/useGetBookById";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fetcher } from "@/hooks/fetcher";
import { getIsbnLink } from "@/utils/isbnApi";
import useSWR from "swr";
import { VolumeList } from "@/types/googleBooksAPI";
import { useBookRequestDialog } from "@/hooks/bookRequest/useBookRequestDialog";

function validateBookData(data: VolumeList): boolean {
  return data != undefined && data.items && data.items.length > 0;
}

export const InspectPage: React.FC = () => {
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

  const bookId = bookDataFoundByIsbn ? bookDataFoundByIsbn[0]?.id : undefined;

  const { DialogComponent } = useBookReportDialog(bookId);
  const {
    DialogComponent: BookRequestDialogComponent,
    handleOpenDialog: openBookRequestDialog,
  } = useBookRequestDialog(bookId);

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
              <Button
                variant="secondary"
                className={cn("text-lg w-1/4 mr-3 py-6", "hover:bg-white")}
                onClick={openBookRequestDialog}
              >
                Request
              </Button>
              {/* <Button
                className={cn(
                  "text-white text-lg",
                  "py-6 mr-3 w-1/4",
                  "bg-red-900",
                  "hover:bg-red-800"
                )}
                variant="secondary"
                disabled={isReportingBook}
                onClick={openDialog}
              >
                Report
              </Button> */}
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

      {DialogComponent}
      {BookRequestDialogComponent}
    </div>
  );
};
