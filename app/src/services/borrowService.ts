import { supabase } from "../supabase/supabaseClient";
import { Borrow } from "../types/supabaseTypes";
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
