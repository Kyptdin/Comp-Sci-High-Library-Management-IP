import { supabase } from "../supabase/supabaseClient.ts";
import { BorrowsUpdate } from "../types/types.d.ts";

export interface ReturnBookProps {
  userId: string;
  isbn: string;
}

/**
 * Retrieves borrow entries from the database based on the book's ISBN and the user's ID that have not been returned.
 *
 * @param isbn - The ISBN of the book.
 * @param userId - The ID of the user.
 * @returns An array of borrow data.
 */
export const getAllBorrowsNotReturnedByIsbnAndUserId = async (
  isbn: string,
  userId: string
) => {
  const { data: borrows, error } = await supabase
    .from("borrows")
    .select("*")
    // Filters
    .eq("isbn", isbn)
    .eq("user", userId)
    .eq("returned", false);

  if (error) {
    throw new Error(error.message);
  }

  return borrows;
};

/**
 * Edits a borrow entry in the database based on the user's ID and the book's ISBN.
 *
 * @param userId - The ID of the user.
 * @param isbn - The ISBN of the book.
 * @param newBorrowData - The new data for the borrow entry.
 * @returns The updated borrow data.
 */
export const editBorrowByUserIdAndIsbn = async (
  userId: string,
  isbn: string,
  newBorrowData: BorrowsUpdate
) => {
  const { data, error } = await supabase
    .from("borrows")
    .update(newBorrowData)
    .eq("user", userId)
    .eq("isbn", isbn)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Handles the process of returning a borrowed book.
 *
 * @param userId - The ID of the user returning the book.
 * @param isbn - The ISBN of the book being returned.
 * @returns The updated borrow data indicating the book has been returned.
 */
export const returnBorrowedBook = async ({ userId, isbn }: ReturnBookProps) => {
  if (!userId || !isbn) return null;

  const borrowData = await getAllBorrowsNotReturnedByIsbnAndUserId(
    isbn,
    userId
  );

  // Can't return the book if the user isn't currently borrowing the booking
  if (borrowData.length === 0) {
    throw new Error(
      "Failed to borrow book. You are not currently borrowing the book"
    );
  }

  //Look for all the borrows with the user id of the user and the isbn of the book and set "returned" column to true
  const editingBorrowsPromisesArr = borrowData.map(() => {
    return editBorrowByUserIdAndIsbn(userId, isbn, {
      returned: true,
    });
  });
  const settingBorrowsToReturnedData = await Promise.all(
    editingBorrowsPromisesArr
  );

  return settingBorrowsToReturnedData;
};
