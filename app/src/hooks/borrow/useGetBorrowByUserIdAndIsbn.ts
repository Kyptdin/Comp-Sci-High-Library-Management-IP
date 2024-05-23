import { getBorrowsByUserIdAndIsbn } from "@/services/borrowService";
import { useQuery } from "@tanstack/react-query";

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
