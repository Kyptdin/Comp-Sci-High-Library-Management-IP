import { getUserBookRatingByUserIdAndRatingId } from "@/services/userBookRatingService";
import { UserBookRatings } from "@/types/supabaseTypes";
import { useQuery } from "@tanstack/react-query";

export type UserGetUserBookRatingsByUserIdAndRatingIdData =
  | UserBookRatings[]
  | null
  | undefined;

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
