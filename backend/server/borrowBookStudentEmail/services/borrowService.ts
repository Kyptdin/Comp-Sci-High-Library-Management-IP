import { supabase } from "../supabase/supabaseClient.ts";
import { Borrow } from "../types/types.d.ts";

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
 * Retrieves borrow entries from the database within the last week based on the user's ID.
 *
 * @param userId - The ID of the user.
 * @returns An array of borrow data.
 */
export const getBorrowsWithinLastWeekFromUser = async (userId: string) => {
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
