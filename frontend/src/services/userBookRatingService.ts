import { UserBookRatings } from "@/types/supabaseTypes";
import { supabase } from "../supabase/supabaseClient";

/*
Supabse does not provide routes. Instead, Supabase provides a SDK to allow programmers to make api calls through the frontend. I just put "POST ROUTES" to help you understand what this functions can be sorta understood as. To test these "routes" you can just call the function in a useEffect hook whenever the page loads.
*/
/****** POST ROUTES ******/
export const createUserBookRating = async (
  userBookRatings: UserBookRatings
) => {
  const { data, error } = await supabase
    .from("user_book_ratings")
    .insert(userBookRatings)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/****** GET ROUTES ******/
export const getUserBookRatingById = async () => {
  const { data: userBookRatings, error } = await supabase
    .from("user_book_ratings")
    .select("id");

  if (error) {
    throw new Error(error.message);
  }

  return userBookRatings;
};

/****** UPDATE ROUTES ******/

/****** DELETE ROUTES ******/