import { getBookRatingByBookId } from "@/services/bookRatingService";
import { useQuery } from "@tanstack/react-query";

export const useGetBookRatingByBookId = (bookId: string | undefined) => {
  const query = useQuery({
    queryKey: ["getBookRatingByBookId", bookId],
    queryFn: async () => {
      if (!bookId) return null;

      return await getBookRatingByBookId(bookId);
    },
  });

  return query;
};
