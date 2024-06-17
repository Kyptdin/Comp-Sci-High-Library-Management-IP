import { getBookRatingByBookId } from "@/services/bookRatingService";
import { BookRatings } from "@/types/supabaseTypes";
import { useQuery } from "@tanstack/react-query";

export type QueryGetBookRatingByBookId = BookRatings | null | undefined;

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
