import { getUserLatestRatingByBookIdAndUserId } from "@/services/userBookRatingService";
import { useQuery } from "@tanstack/react-query";

export const useGetUserLatestRatingOnBook = (
  bookId: string | undefined,
  userId: string | undefined
) => {
  const query = useQuery({
    queryKey: ["getUserLatestRatingByBookIdAndUserId", bookId, userId],
    queryFn: async () => {
      if (!bookId || !userId) return null;

      return await getUserLatestRatingByBookIdAndUserId(bookId, userId);
    },
  });

  return query;
};
