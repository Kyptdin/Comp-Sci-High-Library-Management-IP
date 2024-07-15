import { BookRequests, BookRequestsUpdate } from "@/types/supabaseTypes";
import { supabase } from "../../supabase/supabaseClient";
import { RequestBookMutationProps } from "@/hooks/bookRequest/useRequestBook";

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

export const sendBookRequest = async (data: RequestBookMutationProps) => {
  const url = "http://localhost:8000/";

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  alert(`Got here #1`);

  try {
    const response = await fetch(url, requestOptions);
    alert(`Got here #2`);

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    const errorCasted = error as Error;
    throw new Error(errorCasted.message);
  }
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
