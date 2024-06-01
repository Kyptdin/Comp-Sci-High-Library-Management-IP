import { ReturnBookProps } from "@/hooks/borrow/useReturnBook";
import { supabase } from "../supabase/supabaseClient";
import { Borrow, BorrowsUpdate } from "../types/supabaseTypes";
/*
Supabse does not provide routes. Instead, Supabase provides a SDK to allow programmers to make api calls through the frontend. I just put "POST ROUTES" to help you understand what this functions can be sorta understood as. To test these "routes" you can just call the function in a useEffect hook whenever the page loads.
*/
/****** POST ROUTES ******/
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

// TODO: Take into consideration that the user may have to return multiple copies of the same book
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
