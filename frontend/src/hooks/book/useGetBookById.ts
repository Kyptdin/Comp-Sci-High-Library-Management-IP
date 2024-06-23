import { getBookById } from "@/services/bookService";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch a book by its ID.
 * @param {string | undefined} id - The ID of the book to fetch.
 */
export const useGetBookById = (id: string | undefined) => {
  const query = useQuery({
    queryKey: ["searchBookById", id],
    queryFn: async () => {
      if (!id) return null;
      return await getBookById(id);
    },
  });
  return query;
};
