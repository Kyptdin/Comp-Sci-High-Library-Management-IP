import { useEffect } from 'react'
import { useState } from 'react';

import { BookDisplay } from '@/components/BookDisplay'
import { BookDisplaySkeleton } from '@/components/BookDisplaySkeleton';

import { fetchBookFromIsbn, isbnApiLink } from '@/utils/isbnApi'

import { VolumeList } from '@/types/googleBooksAPI'

export const BookDisplayFromIsbn = ({isbn} : {isbn: string}) => {
    const [
        bookData, 
        setBookData
    ] = useState<VolumeList | undefined>(undefined);

    useEffect(() => {
        fetchBookFromIsbn(
            isbnApiLink,
            { arg: isbn }
        ).then((data: VolumeList) => {
            setBookData(data);
        });
    }, [])

    const { volumeInfo } = bookData?.items[0] || {};

    return (bookData ? <BookDisplay
        image={volumeInfo?.imageLinks?.thumbnail}
        author={volumeInfo?.authors![0]}>
        {volumeInfo?.title || "undefined"}
    </BookDisplay> : <BookDisplaySkeleton/>)
}
