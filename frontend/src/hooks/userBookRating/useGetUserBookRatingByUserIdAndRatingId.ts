import { getUserBookRatingByUserIdAndRatingId } from "@/services/userBookRatingService";
import { useQuery } from "@tanstack/react-query";

export const useGetUserBookRatingByUserIdAndRatingId = (
  userId: string | undefined,
  ratingId: string | undefined
) => {
  const query = useQuery({
    queryFn: async () => {
      if (!userId || !ratingId) return null;

      return await getUserBookRatingByUserIdAndRatingId(userId, ratingId);
    },
    queryKey: ["getUserbookRatingByUserIdAndRatingId", userId, ratingId],
  });

  return query;
};
