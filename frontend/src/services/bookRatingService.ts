import { supabase } from "../supabase/supabaseClient";
import { BookRatings, BookRatingsUpdate } from "@/types/supabaseTypes";
import { getUserBookRatingByUserIdAndRatingId } from "./userBookRatingService";
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
    throw new Error(error.message);
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

export const getBookRatingByBookId = async (bookId: string) => {
  const { data: bookRatings, error } = await supabase
    .from("book_ratings")
    .select("*")
    .eq("book_id", bookId);

  if (error) {
    throw new Error(error.message);
  }

  return bookRatings;
};

/****** UPDATE ROUTES ******/
export const upvoteBookRating = async (userId: string, bookId: string) => {
  // Checks if the book even exist
  const ratingWithTheBook = await getBookRatingByBookId(bookId);
  const ratingId = ratingWithTheBook[0].id;

  if (ratingWithTheBook.length === 0) {
    throw new Error();
  }

  //Check if the user has already upvoted
  const userRatingTowardsBook = await getUserBookRatingByUserIdAndRatingId(
    userId,
    ratingId
  );

  if (userRatingTowardsBook[0].is_upvote) {
    throw new Error("You have already upvoted the book.");
  }

  // Upvotes after all the checks are done
  const { data: updateDataBookRating, error } = await supabase
    .from("book_ratings")
    .update({})
    .eq("id", ratingId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return updateDataBookRating;
};

export const downvoteBookRatingById = async (
  id: string,
  updateBookRating: BookRatingsUpdate
) => {
  const { data: updateDataBookRating, error } = await supabase
    .from("book_ratings")
    .update(updateBookRating)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return updateDataBookRating;
};

/****** DELETE ROUTES ******/
