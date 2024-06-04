import { searchBookBySimilarTitle } from "@/services/bookService";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to search for books by a similar title.
 * @param {string | undefined} queryString - The query string to search for.
 * @returns {Object} Object containing the query state.
 */
export const useSearchBookBySimilarTitle = (
  queryString: string | undefined
) => {
  const query = useQuery({
    queryKey: ["searchBookBySimilarTitle", queryString],
    queryFn: async () => {
      if (queryString === undefined) return null;
      return await searchBookBySimilarTitle(queryString);
    },
  });
  return query;
};
