import { supabase } from "../supabase/supabaseClient.ts";

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
