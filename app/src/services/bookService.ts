import { Book } from "@/types/supabaseTypes";
import { supabase } from "../supabase/supabaseClient";
/*
Supabse does not provide routes. Instead, Supabase provides a SDK to allow programmers to make api calls through the frontend. I just put "POST ROUTES" to help you understand what this functions can be sorta understood as. To test these "routes" you can just call the function in a useEffect hook whenever the page loads.
*/
/****** POST ROUTES ******/
export const createBook = async (bookData: Book) => {
  const { data, error } = await supabase
    .from("books")
    .insert([bookData])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/****** GET ROUTES ******/
export const getBookById = async (id: string) => {
  const { data: books, error } = await supabase
    .from("books")
    .select("*")
    // Filters
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return books;
};

// Uses a search engine provided by supabase
export const searchBookBySimilarTitle = async (searchString: string) => {
  const { data, error } = await supabase
    .from("books")
    .select("title")
    .textSearch("title", searchString, {
      type: "websearch",
      config: "english",
    });
  if (error) {
    console.log(error.message);
    return new Error(error.message);
  }
  console.log(data);
  return data;
};
