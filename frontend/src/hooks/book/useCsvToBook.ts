import { useEffect, useState } from "react";

import { DataInterface, ValidateBookEntry } from "@/types/csvBookInterface";
import { VolumeList } from "@/types/googleBooksAPI";

import { useCreateBook } from "@/hooks/book/useCreateBook";
import { isbnApiLink, fetchBookFromIsbn } from "@/utils/isbnApi";

export const useCsvToBook = (
  bookDataContainer: DataInterface[] | undefined
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
        const newSuccessEntry: ValidateBookEntry = {
          ...validatedBook,
          UploadedStatus: "success",
        };
        setBooksValidated((oldValidatedBooks) => [
          ...oldValidatedBooks,
          newSuccessEntry,
        ]);
      } catch {
        const newFailedEntry: ValidateBookEntry = {
          ...validatedBook,
          UploadedStatus: "failure",
        };
        setBooksValidated((oldValidatedBooks) => [
          ...oldValidatedBooks,
          newFailedEntry,
        ]);
      }
    }
  };

  const validateBook = async (bookData: DataInterface) => {
    if (!bookData.ISBN || bookData.ISBN.length <= 0) return;

    const validateBookEntry: ValidateBookEntry = {
      Isbn: bookData.ISBN || "--",
      Validated: false,
      Title: "--",
      Copies: bookData.COPIES,
      UploadedStatus: "pending",
    };

    fetchBookFromIsbn(isbnApiLink, {
      arg: bookData.ISBN,
    }).then(async (bookDataFromGoogle: VolumeList) => {
      if (bookDataFromGoogle.totalItems <= 0) {
        addValidatedBook(validateBookEntry);
        return;
      }

      // Error
      console.log(bookDataFromGoogle);
      const { volumeInfo } = bookDataFromGoogle.items[0];
      const { title } = volumeInfo;

      validateBookEntry.Title = title;
      validateBookEntry.Validated = true;
      await addValidatedBook(validateBookEntry);
    });
  };

  useEffect(() => {
    if (!bookDataContainer) return;

    const cleanup = [];

    // validate the books using timeout
    for (let i = 0; i < bookDataContainer.length; i++) {
      const updatingChunk = bookDataContainer[i];

      cleanup.push(
        setTimeout(() => {
          // updatingChunk.forEach((bookData: DataInterface) => {
          validateBook(updatingChunk);
          // });
        }, 1000 * (i + 1))
      );
    }

    return () => {
      cleanup.forEach((timeoutCleanup) => {
        if (!timeoutCleanup) return;

        clearTimeout(timeoutCleanup);
      });
    };
  }, [bookDataContainer]);

  return { booksValidated };
};
