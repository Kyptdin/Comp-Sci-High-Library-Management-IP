import { getAllBorrowsNotReturnedByIsbnAndUserId } from "@/services/borrowService";
import { useQuery } from "@tanstack/react-query";

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
