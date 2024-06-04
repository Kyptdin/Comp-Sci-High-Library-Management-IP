import { Book, Borrow } from "../types/supabaseTypes.ts";
import { supabase } from "../supabase/supabaseClient.ts";
import { fetchBookFromIsbn, isbnApiLink } from "../utils/isbnApi.ts";
import {
  createBorrow,
  getAllBorrowsNotReturnedByIsbn,
  getBorrowsWithinLastWeekFromUser,
} from "./borrowService.ts";
import { VolumeList } from "../types/googleBooksAPI.ts";
import { EditBooksProp } from "../hooks/book/useEditBook.ts";
import { convertToTsQuery } from "../utils/convertToTsQuery.ts";

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

export const massCreateBooks = async (bookDataArr: Book[]) => {
  const promiseBookArr = bookDataArr.map((book) => {
    return createBook(book);
  });
  const bookDataFuillment = await Promise.allSettled(promiseBookArr);
  //Set all the books that have failed to upload
  const bookRespoonseData = bookDataFuillment.map((bookReponse) => {
    if (bookReponse.status === "rejected") {
      return null;
    } else {
      return bookReponse.value[0];
    }
  });

  // If the book is data at a certain index is null, then you can assume that the upload for that book failed
  return bookRespoonseData;
};

// Unlike the "createBook" function, this function takes care of the bussines logic when borrowing the book. Use this function when the user is trying to borrow not the function above.
export const borrowBook = async (borrowInput: Borrow) => {
  //Step #1 Checks if the book has any aviable copies within the school
  const bookSearchByIsbn = await getBookById(borrowInput.isbn);
  const maxAmountOfCopiesWithinTheSchool =
    bookSearchByIsbn[0].total_copies_within_school;
  // Could be improved
  const copiesDataFromBookThatHaveTheBook =
    await getAllBorrowsNotReturnedByIsbn(borrowInput.isbn);
  const totalNumberOfCopiesPeopleHave =
    copiesDataFromBookThatHaveTheBook.length;

  if (
    maxAmountOfCopiesWithinTheSchool === 0 ||
    totalNumberOfCopiesPeopleHave === maxAmountOfCopiesWithinTheSchool
  ) {
    throw new Error("Failed to borrow book. No available copies.");
  }

  // Step #2: Checks if the user has exceeded their limit on the number of books they can borrow per week. Doesn't matter if the user has returned the book or not.
  const totalBooksBorrowedThisWeek = await getBorrowsWithinLastWeekFromUser(
    borrowInput.user
  );
  const totalNumberOfBooksUserHasBorrowedThisWeek =
    totalBooksBorrowedThisWeek.length;

  if (totalNumberOfBooksUserHasBorrowedThisWeek > 10) {
    throw new Error("Failed to borrow book. Reached weekly borrow limit.");
  }

  // Step #3: If the user hasn't exceeded their limit and there's still copies that can be borrowed then allow the user to borrow
  const borrowData = await createBorrow(borrowInput);
  return borrowData;
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

// Uses a search engine provided by supabase. The books returned doesn't always have to exactly match the search string just has to be similar to the search string
export const searchBookBySimilarTitle = async (searchString: string) => {
  // Gets all the books that match the search string
  const { data, error } = await supabase
    .from("books")
    .select("title")
    .textSearch("title", convertToTsQuery(searchString), {
      type: "phrase",
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
  const requestArrOfBooks = data.map(async (titleObj) => {
    return await getBookByTitle(titleObj.title);
  });
  const bookDataForSearchQuery = await Promise.allSettled(requestArrOfBooks);
  const successfulQuries = bookDataForSearchQuery.filter(
    (query) => query.status === "fulfilled"
  ) as PromiseFulfilledResult<Book[]>[];
  // Flattening the results because rendering the search results is easier if there's just 1 array; no sub arrays
  const successfulQuriesFlatten = successfulQuries.flatMap(
    (book) => book.value
  );
  const requestArrOfBooksGoogleAPI: Promise<VolumeList>[] =
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
    // .items[0].volumeInfo.authors
  ) as PromiseFulfilledResult<VolumeList>[];
  const googleAPIDAtaFlat = successfulGoogleAPIQuries.map((query) => {
    const data = query.value;
    const firstBookItem = data?.items[0];
    const info = firstBookItem?.volumeInfo;
    const image = info?.imageLinks?.thumbnail;
    const authors = data?.items[0]?.volumeInfo?.authors?.join(" ");
    return {
      image,
      authors,
    };
  });
  const bookDataPairedWithImage = successfulQuriesFlatten.map((data, index) => {
    return { ...data, googleBooksApiData: googleAPIDAtaFlat[index] };
  });
  return bookDataPairedWithImage;
};

/****** EDIT ROUTES ******/
export const editBookByISBN = async ({ isbn, newBookData }: EditBooksProp) => {
  const { data, error } = await supabase
    .from("books")
    .update(newBookData)
    .eq("id", isbn)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/****** DELETE ROUTES ******/
export const deleteBookByISBN = async (id: string) => {
  const { error } = await supabase.from("books").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
};
