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
