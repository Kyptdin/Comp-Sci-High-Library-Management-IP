import { Book } from "@/types/supabaseTypes";
import { supabase } from "../supabase/supabaseClient";
import { fetchBookFromIsbn, isbnApiLink } from "@/utils/isbnApi";
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

export const getBookByTitle = async (title: string) => {
  const { data: books, error } = await supabase
    .from("books")
    .select("*")
    // Filters
    .eq("title", title);
  if (error) {
    throw new Error(error.message);
  }
  return books;
};

// Uses a search engine provided by supabase
export const searchBookBySimilarTitle = async (searchString: string) => {
  // Gets all the books that match the search string
  const { data, error } = await supabase
    .from("books")
    .select("title")
    .textSearch("title", searchString, {
      type: "websearch",
      config: "english",
    });
  if (error) {
    throw new Error(error.message);
  }
  // There's no books that have a title that matches the search string so null is returned
  if (!data || data.length === 0) {
    return null;
  }
  // Fetches the data for the assocaited title in parrellel
  const requestArrOfBooks = data.map((titleObj) => {
    return getBookByTitle(titleObj.title);
  });
  const bookDataForSearchQuery = await Promise.allSettled(requestArrOfBooks);
  const successfulQuries = bookDataForSearchQuery.filter(
    (query) => query.status === "fulfilled"
  ) as PromiseFulfilledResult<Book[]>[];
  // Flattening the results because rendering the search results is easier if there's just 1 array; no sub arrays
  const successfulQuriesFlatten = successfulQuries.flatMap(
    (book) => book.value
  );
  const requestArrOfBooksGoogleAPI: Promise<BooksVolumesResponse>[] =
    successfulQuriesFlatten.map(async (successfulQurie) => {
      return fetchBookFromIsbn(isbnApiLink, {
        arg: successfulQurie.id,
      });
    });
  const googleAPIDataForBooks = await Promise.allSettled(
    requestArrOfBooksGoogleAPI
  );
  const successfulGoogleAPIQuries = googleAPIDataForBooks.filter(
    (query, index) => {
      const failedQuery = query.status === "rejected";
      if (query.status === "rejected") {
        // Removing from the array because the website should only render books that the program was able to get the cover of
        successfulQuriesFlatten.splice(index, 1);
      }
      return !failedQuery;
    }
  ) as PromiseFulfilledResult<BooksVolumesResponse>[];
  const imagesOfBooks = successfulGoogleAPIQuries.flatMap((query) => {
    const data = query.value;
    const firstBookItem = data?.items[0];
    const info = firstBookItem?.volumeInfo;
    const image = info?.imageLinks?.smallThumbnail;
    return image;
  });
  const bookDataPairedWithImage = successfulQuriesFlatten.map((data, index) => {
    return { ...data, image: imagesOfBooks[index] };
  });

  console.log(bookDataPairedWithImage);

  return bookDataPairedWithImage;
};
