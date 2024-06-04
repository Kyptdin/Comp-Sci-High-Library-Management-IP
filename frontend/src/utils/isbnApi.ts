/**
 * Represents a list of volumes (books) returned by the Google Books API.
 */
import { VolumeList } from "../types/googleBooksAPI";

/**
 * Base URL for the Google Books API to search by ISBN.
 */
export const isbnApiLink = `https://www.googleapis.com/books/v1/volumes?q=isbn:`;

/**
 * Constructs a complete API link for fetching book data using an ISBN.
 * @param isbn - The ISBN of the book.
 * @returns The complete API link.
 */
export const getIsbnLink = (isbn: string | number | undefined): string => {
  return `${isbnApiLink}${isbn}`;
};

/**
 * Fetches book data from the Google Books API using an ISBN.
 * @param url - The API URL.
 * @param arg - The ISBN of the book.
 * @returns A promise that resolves to the VolumeList interface.
 */
export const fetchBookFromIsbn = async (
  url = isbnApiLink,
  { arg }: { arg: string }
): Promise<VolumeList> => {
  return fetch(`${url}${arg}`).then((res) => res.json());
};
