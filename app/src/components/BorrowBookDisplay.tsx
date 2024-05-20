import { Borrow } from "@/types/supabaseTypes";

import { BookDisplaySkeleton } from "@/components/BookDisplaySkeleton";
import { BookDisplayImage } from "@/components/BookDisplayImage";

import useSWR from "swr";
import { getIsbnLink } from "@/utils/isbnApi";
// @ts-ignore comment
import { fetcher } from "@/hooks/fetcher";

export const BorrowBookDisplay = ({ bookData }: { bookData: Borrow }) => {
  const { data, error, isLoading } = useSWR(
    getIsbnLink(bookData.isbn),
    fetcher
  );

  const firstBookItem = data?.items[0];
  const info = firstBookItem?.volumeInfo;

  return (
    <div className="justify-start flex mb-2">
      {isLoading | error ? (
        <BookDisplaySkeleton className="p-0 mr-5 h-[220px] w-[150px] rounded-md" />
      ) : (
        <BookDisplayImage
          // IMPORTANT:Here's how the images are rendered
          src={info?.imageLinks?.smallThumbnail}
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
              {/* TODO: Add the missing tag by comparing current date with due date */}
              <p className="px-4 py-1 bg-red-800 rounded-full h-fit">MISSING</p>

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
