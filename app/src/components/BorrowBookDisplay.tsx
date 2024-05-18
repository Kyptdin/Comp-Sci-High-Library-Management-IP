import { Borrow } from "@/types/supabaseTypes"

import { BookDisplaySkeleton } from "@/components/BookDisplaySkeleton";

import useSWR from 'swr'
import { getIsbnLink } from "@/utils/isbnApi";
// @ts-ignore comment
import { fetcher } from "@/hooks/fetcher";

export const BorrowBookDisplay = ({bookData} : {bookData: Borrow}) => {
    // const { data, error, isLoading } = useSWR(getIsbnLink(bookData.isbn), fetcher)

    return <div className="justify-start flex mb-2">
        {/* {isLoading ? 
        <BookDisplaySkeleton className="p-0 m-0 h-[220px] w-[150px] rounded-md"/> :
        <></>} */}

        <div className="py-7 flex flex-col justify-around">
            <div className="text-white mb-5">
                <h1 className="text-2xl">Book title</h1>
                <h2 className="text-white mb-2">ISBN: {bookData?.isbn}</h2>
                <h2 className="text-xl">Due date: {bookData?.return_due_date}</h2>
            </div>

            <div className="mb-5">
                <p className="mb-2">Current status:</p>
                <div className="text-xs inline-flex flex-wrap gap-2">
                    <p className="px-4 py-1 bg-orange-700 rounded-full h-fit">BORROWED</p>
                    <p className="px-4 py-1 bg-red-800 rounded-full h-fit">MISSING</p>
                    <p className="px-4 py-1 bg-green-800 rounded-full h-fit">RETURNED</p>
                </div>
            </div>
        </div>
    </div>
}