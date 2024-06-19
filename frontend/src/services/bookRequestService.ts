import { BookRequests, BookRequestsUpdate } from "@/types/supabaseTypes";
import { supabase } from "supabase/supabaseClient";

/****** POST ROUTES ******/
export const createBookRequest = async (bookRequestData: BookRequests) => {
  const { data, error } = await supabase
    .from("book_requests")
    .insert(bookRequestData)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
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
