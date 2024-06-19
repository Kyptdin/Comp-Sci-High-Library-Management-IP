import { getBookUpvoteAndDownvoteById } from "@/services/userBookRatingService";
import { useQuery } from "@tanstack/react-query";

export const useGetBookUpvoteAndDownvoteById = (bookId: string | undefined) => {
  const query = useQuery({
    queryKey: ["getBookUpvoteAndDownvoteById", bookId],
    queryFn: async () => {
      if (!bookId) return null;
      return await getBookUpvoteAndDownvoteById(bookId);
    },
  });

  return query;
};
