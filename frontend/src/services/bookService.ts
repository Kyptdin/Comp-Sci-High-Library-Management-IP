import { Book, Borrow } from "../types/supabaseTypes.ts";
import { supabase } from "../supabase/supabaseClient.ts";
import { fetchBookFromIsbn, isbnApiLink } from "../utils/isbnApi.ts";
import { VolumeList } from "../types/googleBooksAPI.ts";
import { EditBooksProp } from "../hooks/book/useEditBook.ts";

// deployctl deploy --prod --project=borrowed-book-studentmail server.ts --save-config
/*
Supabse does not provide routes. Instead, Supabase provides a SDK to allow programmers to make api calls through the frontend. I just put "POST ROUTES" to help you understand what this functions can be sorta understood as. To test these "routes" you can just call the function in a useEffect hook whenever the page loads.
*/
/****** POST ROUTES ******/
/**
 * Creates a new book entry in the database.
 *
 * @param bookData - The data of the book to be created.
 * @returns The newly created book data.
 */
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

/**
 * Mass creates multiple books in the database.
 *
 * @param bookDataArr - An array of book data to be created.
 * @returns An array indicating the success of each book creation operation.
 */
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
/**
 * Handles the process of borrowing a book, including business logic checks.
 *
 * @param borrowInput - The borrow request details.
 * @returns The borrowed book data.
 * @throws An error if the borrowing process fails.
 */
export const borrowBook = async (borrowInput: Borrow) => {
  const response = await fetch(
    "https://borrowed-book-studentmail-r5amcvsk3bcs.deno.dev/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(borrowInput),
    }
  );
  if (!response.ok) {
    // const errorMessageCasted = data as ErrorMessage;
    throw new Error("Failed to borrow book");
  }
};

/****** GET ROUTES ******/
/**
 * Retrieves book data from the database based on its ID.
 *
 * @param id - The ID of the book to retrieve.
 * @returns The book data matching the ID.
 */
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

/**
 * Retrieves book data from the database based on its title.
 *
 * @param title - The title of the book to retrieve.
 * @returns The book data matching the title.
 */
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

/**Get the total number of rows**/
export const getTotalNumberOfRows = async () => {
  const { count } = await supabase
    .from("books")
    .select("*", { count: "exact", head: true });

  return count;
};

/**Get the books with pagination**/
export const getBooksWithPagination = async (
  startIndex: number,
  endIndex: number
) => {
  const { data: books, error } = await supabase
    .from("books")
    .select("*")
    .range(startIndex, endIndex);

  if (error) {
    throw new Error(error.message);
  }

  return books;
};

/**Get a random book from the school database**/
export const getRandomBook = async () => {
  const totalRows = await getTotalNumberOfRows();

  if (!totalRows) {
    throw new Error("No books exist within the school database");
  }

  const randomIndex = Math.floor(Math.random() * totalRows);

  const randomBook = await getBooksWithPagination(randomIndex, randomIndex);

  return randomBook;
};

// Uses a search engine provided by supabase. The books returned doesn't always have to exactly match the search string just has to be similar to the search string
/**
 * Searches for books in the database with titles similar to the search string.
 *
 * @param searchString - The search string to match book titles against.
 * @returns An array of books with similar titles, along with their details.
 *          Returns null if no books match the search string.
 */
export const searchBookBySimilarTitle = async (searchString: string) => {
  // Gets all the books that match the search string
  const { data: booksFoundByTitle, error } = await supabase
    .from("books")
    .select("*")
    .ilike("title", `%${searchString}%`);

  if (error) {
    throw new Error(error.message);
  }
  // There's no books that have a title that matches the search string so null is returned
  if (!booksFoundByTitle || booksFoundByTitle.length === 0) {
    return null;
  }

  const requestArrOfBooksGoogleAPI: Promise<VolumeList>[] =
    booksFoundByTitle.map(async (successfulQurie) => {
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
        booksFoundByTitle.splice(index, 1);
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
  const bookDataPairedWithImage = booksFoundByTitle.map((data, index) => {
    return { ...data, googleBooksApiData: googleAPIDAtaFlat[index] };
  });
  return bookDataPairedWithImage;
};

/****** EDIT ROUTES ******/
/**
 * Edits a book in the database based on its ISBN.
 *
 * @param editData - The ISBN of the book to edit and the new data for the book.
 * @returns The updated book data.
 */
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
/**
 * Deletes a book from the database based on its ISBN.
 *
 * @param id - The ISBN of the book to delete.
 */
export const deleteBookByISBN = async (id: string) => {
  const { error } = await supabase.from("books").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
};
