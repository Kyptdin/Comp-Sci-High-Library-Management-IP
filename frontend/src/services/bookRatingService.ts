import { supabase } from "../supabase/supabaseClient";
import { BookRatings } from "@/types/supabaseTypes";

/*
Supabse does not provide routes. Instead, Supabase provides a SDK to allow programmers to make api calls through the frontend. I just put "POST ROUTES" to help you understand what this functions can be sorta understood as. To test these "routes" you can just call the function in a useEffect hook whenever the page loads.
*/
/****** POST ROUTES ******/
/**Create the book rating by inputting an object**/
export const createBookRating = async (bookRating: BookRatings) => {
  const { data, error } = await supabase
    .from("book_ratings")
    .insert(bookRating)
    .select();

  if (error) {
    throw new Error();
  }

  return data;
};

/****** GET ROUTES ******/
/**Gets a book by id**/
export const getBookRatingById = async () => {
  const { data: bookRatings, error } = await supabase
    .from("book_ratings")
    .select("id");

  if (error) {
    throw new Error(error.message);
  }

  return bookRatings;
};

/****** UPDATE ROUTES ******/

/****** DELETE ROUTES ******/
