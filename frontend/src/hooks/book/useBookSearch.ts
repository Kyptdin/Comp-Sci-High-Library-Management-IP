import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useSearchBookBySimilarTitle } from "./useSearchBookBySimilarTitle";

/**
 * Custom hook for searching books by similar title.
 * @param {string} searchText - The text to search for.
 * @returns  Object containing book search results.
 */
export const useBookSearch = (searchText: string) => {
  const [bookResults, setBookResults] = useState({});
  const bookSearchText = useDebounce(searchText, 400);

  const bookResultsQuery = useSearchBookBySimilarTitle(bookSearchText);

  /**
   * Function to check if book is found in search results.
   * @returns {boolean} True if book is found, false otherwise.
   */
  const isBookFound = () => {
    if (!bookResultsQuery.isSuccess) return;
    if (bookResultsQuery.isLoading) return;
    if (bookResultsQuery.isError) return;
    if (!bookResultsQuery?.data) return;
    return true;
  };

  useEffect(() => {
    if (!isBookFound()) {
      setBookResults({});
      return;
    }

    setBookResults(bookResultsQuery.data || {});
  }, [bookSearchText]);

  return { bookResults };
};
