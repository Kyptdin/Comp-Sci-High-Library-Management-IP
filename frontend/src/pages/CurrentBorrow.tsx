import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

import { Navbar } from '@/components/Navbar'

import { useGetLoggedInUser } from '@/hooks/user/useGetLoggedInUser'
import { 
    useGetUserBorrowDataByUserEmail 
} from '@/hooks/borrow/useGetUserBorrowDataByUserEmail'

import { Borrow } from '@/types/supabaseTypes'
import { BookDisplayFromIsbn } from '@/components/Display/BookDisplayFromIsbn'

export const CurrentBorrow = () => {
    const { data } = useGetLoggedInUser();
    const { email } = data?.userMetaData[0]!;

    const borrowDataQuery = useGetUserBorrowDataByUserEmail(email);
    const [borrowing, setBorrowing] = useState<Borrow[]>([]);
    useEffect(() => {
        if (!borrowDataQuery) return;
        if (!borrowDataQuery.data) return; 

        const { borrrows } = borrowDataQuery.data;
        setBorrowing(borrrows);
    }, [borrowDataQuery])

    return <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950">
        <Navbar showNavbar={false}/>

        <div className="text-white font-outfit">
            <h2 className="text-3xl font-bold mb-[10px] px-[45px]">
                Currently Borrowing Books:
            </h2>

            <div className={cn(
                "grid p-5 grid-cols-1 gap-0",
                "2xl:grid-cols-6 2xl:gap-7",
                "xl:grid-cols-5 xl:gap-5",
                "md:grid-cols-3 md:gap-2",
                "sm:grid-cols-2 sm:gap-0",
                "xs:grid-cols-1 xs:gap-0"
            )}>{borrowing.map((borrow: Borrow, key: number) => {
                if (borrow.returned) { return <></> }

                return <BookDisplayFromIsbn 
                    key={key}
                    isbn={borrow?.isbn}
                />
            })}</div>
        </div>
    </div>
}