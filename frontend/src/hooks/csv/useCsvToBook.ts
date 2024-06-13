import { useEffect } from "react";

import { DataInterface } from "@/types/csvBookInterface";

// import { useCreateBook } from "@/hooks/book/useCreateBook";

export const useCsvToBook = (
  bookDataContainer: DataInterface[] | undefined
) => {
  // const { mutateAsync: createBook } = useCreateBook();
  // const [booksValidated, setBooksValidated] = useState<ValidateBookEntry[]>([]);

  // const initBooksValidateBookEntries = () => {
  //   if (!bookDataContainer) return;
  //   const validateBookEntries: ValidateBookEntry[] = bookDataContainer.map(
  //     (_, index) => {
  //       const entry: ValidateBookEntry = {
  //         isbn: bookDataContainer[index].ISBN,
  //         title: "",
  //         copies: bookDataContainer[index].COPIES,
  //         validatedIsbnStatus: "pending",
  //         uploadedStatus: "pending",
  //       };
  //       return entry;
  //     }
  //   );
  //   setBooksValidated((entries) => [...entries, ...validateBookEntries]);
  // };

  // const addValidatedBook = async (validatedBook: ValidateBookEntry) => {
  //   setBooksValidated((oldValidatedBooks) => [
  //     ...oldValidatedBooks,
  //     validatedBook,
  //   ]);

  //   if (validatedBook.Validated) {
  //     try {
  //       await createBook({
  //         id: validatedBook.Isbn,
  //         total_copies_within_school: validatedBook.Copies,
  //         title: validatedBook.Title,
  //       });
  //       const newSuccessEntry: ValidateBookEntry = {
  //         ...validatedBook,
  //         UploadedStatus: "success",
  //       };
  //       setBooksValidated((oldValidatedBooks) => [
  //         ...oldValidatedBooks,
  //         newSuccessEntry,
  //       ]);
  //     } catch {
  //       const newFailedEntry: ValidateBookEntry = {
  //         ...validatedBook,
  //         UploadedStatus: "failure",
  //       };
  //       setBooksValidated((oldValidatedBooks) => [
  //         ...oldValidatedBooks,
  //         newFailedEntry,
  //       ]);
  //     }
  //   }
  // };

  const validateBook = async (bookData: DataInterface) => {
    if (!bookData.ISBN || bookData.ISBN.length <= 0) return;

    // TODO: Continue off from here by updating the logic to validate a isbn and make sure to add a row number to the table. You should go through an array and each interation  shoudl access two elements. Make sure to update the for loop header to accomdate for accessing 2 elements. Create a function to valdiate a isbn and a function to upload a book. Then in a set timeout calls these two functions. Make sure you're able to clear the set timeout aftwards.

    // const validateBookEntry: ValidateBookEntry = {
    //   isbn: bookData.ISBN || "--",
    //   validatedIsbnStatus: false,
    //   Title: "--",
    //   Copies: bookData.COPIES,
    //   UploadedStatus: "pending",
    // };

    // fetchBookFromIsbn(isbnApiLink, {
    //   arg: bookData.ISBN,
    // }).then(async (bookDataFromGoogle: VolumeList) => {
    //   if (bookDataFromGoogle.totalItems <= 0) {
    //     // There's no items found so the isbn is invalid
    //     addValidatedBook(validateBookEntry);
    //     return;
    //   }

    //   // Error
    //   console.log(bookDataFromGoogle);
    //   const { volumeInfo } = bookDataFromGoogle.items[0];
    //   const { title } = volumeInfo;

    //   validateBookEntry.Title = title;
    //   validateBookEntry.Validated = true;
    //   await addValidatedBook(validateBookEntry);
    // });
  };

  useEffect(() => {
    // No files are uploaded so can't continue the process
    if (!bookDataContainer) return;

    // There's files uploaded but there's no status for each of them
    // if (booksValidated.length === 0) {
    //   initBooksValidateBookEntries();
    // }

    const cleanup = [];

    // // validate the books using timeout
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

    // return () => {
    //   cleanup.forEach((timeoutCleanup) => {
    //     if (!timeoutCleanup) return;

    //     clearTimeout(timeoutCleanup);
    //   });
    // };
  }, [bookDataContainer]);

  // return { booksValidated };
};
