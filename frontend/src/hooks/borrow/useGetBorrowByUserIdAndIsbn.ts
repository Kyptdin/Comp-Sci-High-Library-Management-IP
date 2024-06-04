import { getBorrowsByUserIdAndIsbn } from "@/services/borrowService";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to get borrows by user ID and ISBN.
 * @param {string | undefined} userId - The ID of the user.
 * @param {string | undefined} isbn - The ISBN of the book.
 * @returns Object containing the query state.
 */
export const useGetBorrowbyUserIdAndIsbn = (
  userId: string | undefined,
  isbn: string | undefined
) => {
  const query = useQuery({
    queryKey: ["getBorrowByUserIdAndIsbn", userId, isbn],
    queryFn: async () => {
      if (!userId || !isbn) return null;
      return await getBorrowsByUserIdAndIsbn(userId, isbn);
    },
  });
  return query;
};
