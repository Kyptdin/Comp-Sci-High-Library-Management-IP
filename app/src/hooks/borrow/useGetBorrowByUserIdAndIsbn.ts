import { getBorrowsByUserIdAndIsbn } from "@/services/borrowService";
import { useQuery } from "@tanstack/react-query";

export const useGetBorrowbyUserIdAndIsbn = (userId: string, isbn: string) => {
  const query = useQuery({
    queryKey: ["getBorrowByUserIdAndIsbn", userId, isbn],
    queryFn: async () => {
      return await getBorrowsByUserIdAndIsbn(userId, isbn);
    },
  });
  return query;
};
