// Import necessary types and components
import { Borrow } from "@/types/supabaseTypes";
import { BookDisplaySkeleton } from "@/components/BookDisplaySkeleton";
import { BookDisplayImage } from "@/components/BookDisplayImage";

// Import hooks and utility functions
import useSWR from "swr";
import { getIsbnLink } from "@/utils/isbnApi";
// @ts-ignore comment
import { fetcher } from "@/hooks/fetcher";
import { isPastDueDate } from "@/utils/isPastDueDate";

/**
 * BorrowBookDisplay Component
 *
 * This component displays the details of a borrowed book including the cover image, title, ISBN, due date,
 * and current status (e.g., MISSING, BORROWED, RETURNED). It uses SWR for data fetching and displays a
 * skeleton loader while the data is being fetched.
 *
 * @param {Borrow} bookData - Data related to the borrowed book including ISBN, return due date, and return status.
 *
 * Usage:
 *
 * ```jsx
 * import { BorrowBookDisplay } from 'path/to/BorrowBookDisplay';
 *
 * const App = () => (
 *   <BorrowBookDisplay bookData={borrowedBookData} />
 * );
 * ```
 *
 * This will render the borrowed book details including the cover image, title, ISBN, due date, and current status.
 */
export const BorrowBookDisplay = ({ bookData }: { bookData: Borrow }) => {
  const { data, error, isLoading } = useSWR(
    getIsbnLink(bookData.isbn),
    fetcher
  );

  const bookIsMissing =
    !bookData.returned && isPastDueDate(bookData.return_due_date);

  const firstBookItem = data?.items[0];
  const info = firstBookItem?.volumeInfo;

  return (
    <div className="justify-start flex mb-2">
      {isLoading || error ? (
        <BookDisplaySkeleton className="p-0 mr-5 h-[220px] w-[150px] rounded-md" />
      ) : (
        <BookDisplayImage
          // Render the book cover image or a placeholder if the image is not available
          src={info?.imageLinks?.smallThumbnail || "/blank_book.jpg"}
          className="p-0 mr-5 h-[220px] w-[150px] rounded-md"
        />
      )}

      {!isLoading ? (
        <div className="py-7 flex flex-col justify-around">
          <div className="text-white mb-5">
            <h1 className="text-2xl">{info?.title}</h1>
            <h2 className="text-white mb-2">ISBN: {bookData?.isbn}</h2>
            <h2 className="text-xl">Due date: {bookData?.return_due_date}</h2>
          </div>

          <div className="mb-5">
            <p className="mb-2">Current status:</p>
            <div className="text-xs inline-flex flex-wrap gap-2">
              {/* Display the status of the book */}
              {bookIsMissing && (
                <p className="px-4 py-1 bg-red-800 rounded-full h-fit">
                  MISSING
                </p>
              )}

              {bookData.returned ? (
                <p className="px-4 py-1 bg-green-800 rounded-full h-fit">
                  RETURNED
                </p>
              ) : (
                <p className="px-4 py-1 bg-orange-700 rounded-full h-fit">
                  BORROWED
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
