import { BookRequests, BookRequestsUpdate } from "@/types/supabaseTypes";
import { supabase } from "../../supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid";

/****** POST ROUTES ******/
export const createBookRequest = async (
  bookRequestData: Omit<BookRequests, "created_at">
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

export const requestBook = async (
  userId: string,
  bookId: string,
  reason: string,
  explanation: string
) => {
  // Checks if the user has already made a request to have the book
  const requestUserMadeTowardsBook = await getBookRequestByUserIdAndBookId(
    userId,
    bookId
  );

  if (requestUserMadeTowardsBook.length > 0) {
    throw new Error(
      `You have already made a request to obtain the book. Please wait for your teacher to approve your request.`
    );
  }

  const bookRequestCreationData = await createBookRequest({
    id: uuidv4(),
    approved: null,
    book_id: bookId,
    reason,
    explanation,
    user_id: userId,
  });

  return bookRequestCreationData;
};

/****** GET ROUTES ******/
export const getBookRequestById = async (id: string) => {
  const { data: bookRequests, error } = await supabase
    .from("book_requests")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return bookRequests;
};

export const getBookRequestByUserIdAndBookId = async (
  userId: string,
  bookId: string
) => {
  const { data: bookRequests, error } = await supabase
    .from("book_requests")
    .select("*")
    .eq("user_id", userId)
    .eq("book_id", bookId);

  if (error) {
    throw new Error(error.message);
  }

  return bookRequests;
};

/****** UPDATE ROUTES ******/
export const updateBookRequestById = async (
  id: string,
  newData: BookRequestsUpdate
) => {
  const { data, error } = await supabase
    .from("book_requests")
    .update(newData)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const approveBookRequest = async (id: string) => {
  return await updateBookRequestById(id, { approved: true });
};

export const disapproveBookRequest = async (id: string) => {
  return await updateBookRequestById(id, { approved: false });
};

/****** DELETE ROUTES ******/
export const deleteBookRequestById = async (id: string) => {
  const { error } = await supabase.from("book_requests").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};
