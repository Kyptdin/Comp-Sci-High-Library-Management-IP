import { ReturnBookProps } from "@/hooks/borrow/useReturnBook";
import { supabase } from "../supabase/supabaseClient";
import { Borrow, BorrowsUpdate } from "../types/supabaseTypes";
/*
Supabse does not provide routes. Instead, Supabase provides a SDK to allow programmers to make api calls through the frontend. I just put "POST ROUTES" to help you understand what this functions can be sorta understood as. To test these "routes" you can just call the function in a useEffect hook whenever the page loads.
*/
/****** POST ROUTES ******/
/**
 * Creates a new borrow entry in the database.
 *
 * @param borrowData - The data of the borrow to be created.
 * @returns The newly created borrow data.
 */
export const createBorrow = async (borrowData: Borrow) => {
  const { data, error } = await supabase
    .from("borrows")
    .insert([borrowData])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/****** GET ROUTES ******/
/**
 * Retrieves all borrow entries from the database with pagination.
 *
 * @returns An array of borrow data.
 */
export const readAllBorrowsWithPagination = async () => {
  const { data: borrows, error } = await supabase
    .from("borrows")
    .select("*")
    .range(0, 9);
  if (error) {
    throw new Error(error.message);
  }
  return borrows;
};

/**
 * Retrieves borrow entries from the database based on the book's ISBN.
 *
 * @param isbn - The ISBN of the book.
 * @returns An array of borrow data.
 */
export const readBorrowsByISBN = async (isbn: string) => {
  const { data: borrows, error } = await supabase
    .from("borrows")
    .select("*")
    // Filters
    .eq("isbn", isbn);
  if (error) {
    throw new Error(error.message);
  }
  return borrows;
};

/**
 * Retrieves borrow entries from the database based on the user's ID.
 *
 * @param id - The ID of the user.
 * @returns An array of borrow data.
 */
export const readBorrowsByUserId = async (id: string) => {
  const { data: borrows, error } = await supabase
    .from("borrows")
    .select("*")
    // Filters
    .eq("user", id);
  if (error) {
    throw new Error(error.message);
  }
  return borrows;
};

/**
 * Retrieves borrow entries from the database based on the user's ID and the book's ISBN.
 *
 * @param userId - The ID of the user.
 * @param isbn - The ISBN of the book.
 * @returns An array of borrow data.
 */
export const getBorrowsByUserIdAndIsbn = async (
  userId: string,
  isbn: string
) => {
  const { data: borrows, error } = await supabase
    .from("borrows")
    .select("*")
    // Filters
    .eq("user", userId)
    .eq("isbn", isbn);

  if (error) {
    throw new Error(error.message);
  }
  return borrows;
};

/**
 * Retrieves borrow entries from the database based on the user's ID.
 *
 * @param userId - The ID of the user.
 * @returns An array of borrow data.
 */

export const getBorrowsByUserId = async (userId: string) => {
  const { data: borrows, error } = await supabase
    .from("borrows")
    .select("*")
    // Filters
    .eq("user", userId);

  if (error) {
    throw new Error(error.message);
  }

  return borrows;
};

/**
 * Retrieves borrow entries from the database based on the book's ISBN that have not been returned.
 *
 * @param isbn - The ISBN of the book.
 * @returns An array of borrow data.
 */
export const getAllBorrowsNotReturnedByIsbn = async (isbn: string) => {
  const { data: borrows, error } = await supabase
    .from("borrows")
    .select("*")
    // Filters
    .eq("isbn", isbn)
    .eq("returned", false);

  if (error) {
    throw new Error(error.message);
  }

  return borrows;
};

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

// Doesn't return only 1 borrow. If the user borrowed 10 books in the past week then 10 books will be returned
/**
 * Retrieves borrow entries from the database within the last week based on the user's ID.
 *
 * @param userId - The ID of the user.
 * @returns An array of borrow data.
 */
export async function getBorrowsWithinLastWeekFromUser(userId: string) {
  const currentDate = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(currentDate.getDate() - 7);

  const formattedCurrentDate = currentDate.toISOString().split("T")[0];
  const formattedOneWeekAgo = oneWeekAgo.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("borrows")
    .select("*")
    .gte("date_borrowed", formattedOneWeekAgo)
    .lte("date_borrowed", formattedCurrentDate)
    .eq("user", userId);

  if (error) {
    throw new Error(`Error fetching borrows: ${error.message}`);
  }

  return data;
}

/****** EDIT ROUTES ******/
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
  // TODO: Fix the error in the function. Unable to edit the borrows due to some duplicate key error
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
  await fetch("https://return-book-student-email-z694ac4p6hsy.deno.dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, isbn }),
  });
};
