import { supabase } from "../supabase/supabaseClient.ts";
import { BookRequests } from "../types/supabaseTypes.ts";

interface RequestBookMutationProps {
  userId: string;
  bookId: string;
  reason: string;
  explanation: string;
  requestType: string;
}

export const getLatestRequestUserMadeForBook = async (
  userId: string,
  bookId: string
) => {
  const { data: bookRequests, error } = await supabase
    .from("book_requests")
    .select("*")
    .eq("user_id", userId)
    .eq("book_id", bookId)
    .order("created_at", { ascending: false })
    .limit(1); // limit to the latest row

  if (error) {
    throw new Error(error.message);
  }

  return bookRequests;
};

export const createBookRequest = async (
  bookRequestData: Omit<BookRequests, "created_at" | "id">
) => {
  const { data, error } = await supabase
    .from("book_requests")
    .insert(bookRequestData)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const requestBook = async ({
  userId,
  bookId,
  reason,
  explanation,
  requestType,
}: RequestBookMutationProps) => {
  // Checks if the user has already made a request to have the book
  const requestUserMadeTowardsBook = await getLatestRequestUserMadeForBook(
    userId,
    bookId
  );

  if (
    requestUserMadeTowardsBook.length > 0 &&
    requestUserMadeTowardsBook[0].approved === null
  ) {
    throw new Error(
      `You already have a request pending for the book. Please wait until your teacher approves your request.`
    );
  }

  const bookRequestCreationData = await createBookRequest({
    approved: null,
    book_id: bookId,
    reason,
    explanation,
    user_id: userId,
    request_type: requestType,
  });

  return bookRequestCreationData;
};
