import { useEffect, useState } from "react";

import { dataInterface, ValidateBookEntry } from "@/types/csvBookInterface";
import { VolumeList } from "@/types/googleBooksAPI";

import { useCreateBook } from "@/hooks/book/useCreateBook";
import { isbnApiLink, fetchBookFromIsbn } from "@/utils/isbnApi";

export const useCsvToBook = (
    bookDataContainer: dataInterface[] | undefined
) => {
    const { mutateAsync: createBook } = useCreateBook();
    const [booksValidated, setBooksValidated] = useState<ValidateBookEntry[]>([]);

    const addValidatedBook = async (validatedBook: ValidateBookEntry) => {
        setBooksValidated((oldValidatedBooks) => [
            ...oldValidatedBooks,
            validatedBook,
        ]);

        if (validatedBook.Validated) {
            try {
                await createBook({
                    id: validatedBook.Isbn,
                    total_copies_within_school: validatedBook.Copies,
                    title: validatedBook.Title,
                });
            } catch {
                console.log(`Book exists already "${validatedBook.Title}"`);
            }
        }
    };

    const validateBook = (bookData: dataInterface) => {
        if (!bookData.ISBN || bookData.ISBN.length <= 0) return;

        let validateBookEntry: ValidateBookEntry = {
            Isbn: bookData.ISBN || "--",
            Validated: false,
            Title: "--",
            Copies: bookData.COPIES,
        };

        fetchBookFromIsbn(isbnApiLink, {
            arg: bookData.ISBN,
        }).then((bookDataFromGoogle: VolumeList) => {
            if (bookDataFromGoogle.totalItems <= 0) {
                addValidatedBook(validateBookEntry);
                return;
            }

            let { volumeInfo } = bookDataFromGoogle.items[0];
            let { title } = volumeInfo;

            validateBookEntry.Title = title;
            validateBookEntry.Validated = true;
            addValidatedBook(validateBookEntry);
        });
    };

    useEffect(() => {
        if (!bookDataContainer) return;

        // Split array into chunks using reduce method
        let updatingChunks = [];
        const chunkSize = 5;
        for (let i = 0; i < bookDataContainer.length; i += chunkSize) {
            updatingChunks.push(bookDataContainer.slice(i, i + chunkSize));
        }

        let cleanup = [];

        // validate the books using timeout
        for (let i = 0; i < updatingChunks.length; i++) {
            let updatingChunk = updatingChunks[i];

            cleanup.push(setTimeout(() => {
                updatingChunk.forEach((bookData: dataInterface) => {
                    validateBook(bookData);
                });
            }, 2000 * i));
        }

        return () => {
            cleanup.forEach((timeoutCleanup) => {
                if (!timeoutCleanup) return;

                clearTimeout(timeoutCleanup);
            })
        };
    }, [bookDataContainer]);

    return { booksValidated };
};
