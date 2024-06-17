import { BookRatings, BookRatingsUpdate } from "@/types/supabaseTypes";
import {
  createUserBookRating,
  getUserBookRatingByUserIdAndRatingId,
  updateUserBookRatingsById,
} from "./userBookRatingService";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/supabase/supabaseClient";
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
export const getBookRatingById = async (ratingId: string) => {
  const { data: bookRatings, error } = await supabase
    .from("book_ratings")
    .select("*")
    .eq("id", ratingId);

  if (error) {
    throw new Error(error.message);
  }

  return bookRatings;
};

export const getBookRatingByBookId = async (bookId: string) => {
  const { data: bookRatings, error } = await supabase
    .from("book_ratings")
    .select("*")
    .eq("id", bookId);

  if (error) {
    throw new Error(error.message);
  }

  console.log(bookRatings);

  return bookRatings;
};

/****** UPDATE ROUTES ******/
export const upvoteBookRating = async (userId: string, bookId: string) => {
  // Checks if the book has a rating entry
  const ratingWithTheBook = await getBookRatingByBookId(bookId);
  const totalUpvotesBookHas = ratingWithTheBook[0].upvotes;
  const totalDownVotesBookHas = ratingWithTheBook[0].downvotes;
  const ratingId = ratingWithTheBook[0].id;

  if (ratingWithTheBook.length === 0) {
    throw new Error("Book does not have a rating entry created.");
  }

  //Check if the user has already upvoted
  console.log(`userId: ${userId} ratingId: ${ratingId}`);

  const userRatingTowardsBook = await getUserBookRatingByUserIdAndRatingId(
    userId,
    ratingId
  );
  const userMadeAnyRatingTowardsBook = userRatingTowardsBook.length > 0;
  console.log(userRatingTowardsBook);

  if (userMadeAnyRatingTowardsBook && userRatingTowardsBook[0].is_upvote) {
    throw new Error("You have already upvoted the book.");
  }

  // Create a new user rating row to keep track of the user rating
  if (!userMadeAnyRatingTowardsBook) {
    alert("user has not made a rating");
    await createUserBookRating({
      id: uuidv4(),
      is_upvote: true,
      rating_id: ratingId,
      user_id: userId,
    });
  } else {
    alert("rating has been made");
    await updateUserBookRatingsById(userRatingTowardsBook[0].id, {
      is_upvote: true,
    });
  }

  // Upvotes after all the checks are done
  const userDownVotedBook =
    userMadeAnyRatingTowardsBook && !userRatingTowardsBook[0].is_upvote;
  const { data: updateDataBookRating, error } = await supabase
    .from("book_ratings")
    .update({
      upvotes: totalUpvotesBookHas + 1,
      downvotes: userDownVotedBook
        ? totalDownVotesBookHas - 1
        : totalDownVotesBookHas,
    })
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
