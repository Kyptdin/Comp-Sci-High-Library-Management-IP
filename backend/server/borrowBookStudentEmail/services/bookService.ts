import {
  getAllBorrowsNotReturnedByIsbn,
  getBorrowsWithinLastWeekFromUser,
  getAllBorrowsNotReturnedByIsbnAndUserId,
  createBorrow,
} from "./borrowService.ts";
import { supabase } from "../supabase/supabaseClient.ts";
import { Borrow } from "../types/types.d.ts";

// Unlike the "createBook" function, this function takes care of the bussines logic when borrowing the book. Use this function when the user is trying to borrow not the function above.

/**
 * Retrieves book data from the database based on its ID.
 *
 * @param id - The ID of the book to retrieve.
 * @returns The book data matching the ID.
 */
export const getBookById = async (id: string) => {
  const { data: books, error } = await supabase
    .from("books")
    .select("*")
    // Filters
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return books;
};

/**
 * Handles the process of borrowing a book, including business logic checks.
 *
 * @param borrowInput - The borrow request details.
 * @returns The borrowed book data.
 * @throws An error if the borrowing process fails.
 */
export const borrowBook = async (borrowInput: Borrow) => {
  //Step #1 Checks if the book has any aviable copies within the school
  const bookSearchByIsbn = await getBookById(borrowInput.isbn);

  if (bookSearchByIsbn.length === 0) {
    throw new Error(
      `Book with isbn of ${borrowInput.isbn} does not exist in the school.`
    );
  }
  const maxAmountOfCopiesWithinTheSchool =
    bookSearchByIsbn[0].total_copies_within_school;
  // Could be improved
  const copiesDataFromBookThatHaveTheBook =
    await getAllBorrowsNotReturnedByIsbn(borrowInput.isbn);
  const totalNumberOfCopiesPeopleHave =
    copiesDataFromBookThatHaveTheBook.length;

  if (
    maxAmountOfCopiesWithinTheSchool === 0 ||
    totalNumberOfCopiesPeopleHave === maxAmountOfCopiesWithinTheSchool
  ) {
    throw new Error("Failed to borrow book. No available copies.");
  }

  // Step #2: Checks if the user has exceeded their limit on the number of books they can borrow per week. Doesn't matter if the user has returned the book or not.
  const totalBooksBorrowedThisWeek = await getBorrowsWithinLastWeekFromUser(
    borrowInput.user
  );
  const totalNumberOfBooksUserHasBorrowedThisWeek =
    totalBooksBorrowedThisWeek.length;

  if (totalNumberOfBooksUserHasBorrowedThisWeek > 10) {
    throw new Error("Failed to borrow book. Reached weekly borrow limit.");
  }
  // Step #3: Make sure the user isn't already borrowing the book
  const notReturnedBooks = await getAllBorrowsNotReturnedByIsbnAndUserId(
    borrowInput.isbn,
    borrowInput.user
  );
  if (notReturnedBooks.length > 0) {
    throw new Error(
      "Failed to borrow book. You are currently borrowing the book"
    );
  }
  // Step #4: If the user hasn't exceeded their limit and there's still copies that can be borrowed then allow the user to borrow
  const borrowData = await createBorrow(borrowInput);
  return borrowData;
};
