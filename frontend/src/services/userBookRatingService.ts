import { UserBookRatings } from "@/types/supabaseTypes";
import { supabase } from "../../supabase/supabaseClient";
import { UserBookRatingsUpdate } from "../types/supabaseTypes";
import { v4 as uuidv4 } from "uuid";

/*
Supabse does not provide routes. Instead, Supabase provides a SDK to allow programmers to make api calls through the frontend. I just put "POST ROUTES" to help you understand what this functions can be sorta understood as. To test these "routes" you can just call the function in a useEffect hook whenever the page loads.
*/
/****** POST ROUTES ******/
export const createUserBookRating = async (
  userBookRatings: Omit<UserBookRatings, "created_at">
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
export const getUserBookRatingById = async (id: string) => {
  const { data: userBookRatings, error } = await supabase
    .from("user_book_ratings")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return userBookRatings;
};

export const getUserBookRatingByUserIdAndRatingId = async (
  userId: string,
  ratingId: string
) => {
  const { data: userBookRatings, error } = await supabase
    .from("user_book_ratings")
    .select("*")
    .eq("user_id", userId)
    .eq("rating_id", ratingId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return userBookRatings;
};

export const getUserLatestRatingByBookIdAndUserId = async (
  bookId: string,
  userId: string
) => {
  const { data } = await supabase
    .from("user_book_ratings")
    .select("*")
    .eq("book_id", bookId)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1); // Limit the results to the latest entry

  return data;
};

export const getTotalUpvotesBookHasByBookId = async (bookId: string) => {
  const {
    error: gettingUpvotesError,
    data: upvoteData,
    count: totalUpvotes,
  } = await supabase
    .from("user_book_ratings")
    .select("*", { count: "exact" })
    .eq("book_id", bookId)
    .eq("is_upvote", true);

  if (gettingUpvotesError) {
    throw new Error(gettingUpvotesError.message);
  }

  return { upvoteData, totalUpvotes };
};

export const getTotalDownvotesBookHasByBookId = async (bookId: string) => {
  const {
    error: gettingDownvotesError,
    data: downvoteData,
    count: totalDownvotes,
  } = await supabase
    .from("user_book_ratings")
    .select("*", { count: "exact" })
    .eq("book_id", bookId)
    .eq("is_upvote", false);

  if (gettingDownvotesError) {
    throw new Error(gettingDownvotesError.message);
  }

  return { downvoteData, totalDownvotes };
};

export const getBookUpvoteAndDownvoteById = async (bookId: string) => {
  const upvoteData = await getTotalUpvotesBookHasByBookId(bookId);
  const downVoteData = await getTotalDownvotesBookHasByBookId(bookId);

  return { upvoteData, downVoteData };
};

/****** UPDATE ROUTES ******/
/**Gets the lastest rating on a book**/
export const updateUserBookRatingsById = async (
  id: string,
  newData: UserBookRatingsUpdate
) => {
  const { error } = await supabase
    .from("user_book_ratings")
    .update(newData)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};

export const upvoteBookRating = async (userId: string, bookId: string) => {
  //Check if the user has already upvoted
  const latestRatingOnBook = await getUserLatestRatingByBookIdAndUserId(
    bookId,
    userId
  );

  // If the user has already upvoted the book, the upvote count will decrease and user will have a neutral rating. User won't have a upvote or downvote
  if (
    latestRatingOnBook &&
    latestRatingOnBook.length > 0 &&
    latestRatingOnBook[0].is_upvote === true
  ) {
    const userBookRatingId = latestRatingOnBook[0].id;

    return await updateUserBookRatingsById(userBookRatingId, {
      is_upvote: null,
    });
  }

  // Checks if the user has downvoted the book
  if (
    latestRatingOnBook &&
    latestRatingOnBook.length > 0 &&
    latestRatingOnBook[0].is_upvote === false
  ) {
    const userBookRatingId = latestRatingOnBook[0].id;

    await updateUserBookRatingsById(userBookRatingId, {
      is_upvote: null,
    });
  }

  return await createUserBookRating({
    id: uuidv4(),
    book_id: bookId,
    user_id: userId,
    is_upvote: true,
  });
};

export const downvoteBook = async (userId: string, bookId: string) => {
  //Check if the user has already downvoted the book
  const latestRatingOnBook = await getUserLatestRatingByBookIdAndUserId(
    bookId,
    userId
  );

  // If the user has already downvoted the book, the downvote is removed and the user is neutral on the book
  if (
    latestRatingOnBook &&
    latestRatingOnBook.length > 0 &&
    latestRatingOnBook[0].is_upvote === false
  ) {
    const userBookRatingId = latestRatingOnBook[0].id;

    return await updateUserBookRatingsById(userBookRatingId, {
      is_upvote: null,
    });
  }

  // Checks if the user has upvoted the book. If so, the upvote is decreased and the the upvote is increased
  if (
    latestRatingOnBook &&
    latestRatingOnBook.length > 0 &&
    latestRatingOnBook[0].is_upvote === true
  ) {
    const userBookRatingId = latestRatingOnBook[0].id;

    await updateUserBookRatingsById(userBookRatingId, {
      is_upvote: null,
    });
  }

  // User hasn't downvoted the book
  return await createUserBookRating({
    id: uuidv4(),
    book_id: bookId,
    user_id: userId,
    is_upvote: false,
  });
};

/****** DELETE ROUTES ******/
export const deleteUserBookRatingById = async (id: string) => {
  const { error } = await supabase
    .from("user_book_ratings")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};
