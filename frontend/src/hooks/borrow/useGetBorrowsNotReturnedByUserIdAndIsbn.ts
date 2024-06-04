/**
 * This file contains a custom React Query hook `useGetBorrowsNotReturnedByIsbnAndUserId`
 * that fetches borrows not returned based on ISBN and user ID.
 *
 * Dependencies:
 * - `getAllBorrowsNotReturnedByIsbnAndUserId` from `@/services/borrowService`
 * - `useQuery` from `@tanstack/react-query`
 */

import { getAllBorrowsNotReturnedByIsbnAndUserId } from "@/services/borrowService";
import { useQuery } from "@tanstack/react-query";

/**
 * A custom React Query hook that fetches borrows not returned based on ISBN and user ID.
 *
 * @param isbn The ISBN of the book.
 * @param userId The ID of the user.
 * @returns A React Query object containing the borrows not returned.
 */
export const useGetBorrowsNotReturnedByIsbnAndUserId = (
  isbn: string | undefined,
  userId: string | undefined
) => {
  const query = useQuery({
    queryKey: ["getBorrowsNotReturnedByUserIdAndIsbn", userId, isbn],
    queryFn: async () => {
      if (!userId || !isbn) return null;
      return await getAllBorrowsNotReturnedByIsbnAndUserId(isbn, userId);
    },
  });
  return query;
};
