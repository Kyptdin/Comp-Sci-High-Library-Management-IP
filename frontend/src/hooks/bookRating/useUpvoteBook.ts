import { useToast } from "@/components/ui/use-toast";
import { upvoteBookRating } from "@/services/bookRatingService";
import { UserBookRatings } from "@/types/supabaseTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserGetUserBookRatingsByUserIdAndRatingIdData } from "../userBookRating/useGetUserBookRatingByUserIdAndRatingId";

interface MutationProps {
  userId: string;
  bookId: string;
}

export const useUpvoteBook = (
  bookId: string | undefined,
  userId: string | undefined,
  ratingId: string | undefined
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const queryKeyUserBookRatings = [
    "getUserbookRatingByUserIdAndRatingId",
    userId,
    ratingId,
  ];
  const queryKeyBookRating = ["getBookRatingByBookId", bookId];

  // Opimistically sets the upvote icon as filled
  const makeOptimisticUserUpvoteChange = async () => {
    // Cancel any outgoing refetches
    // (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries({
      queryKey: queryKeyUserBookRatings,
    });

    // Snapshot the previous value
    const previousUserBookRatingsData: UserGetUserBookRatingsByUserIdAndRatingIdData =
      queryClient.getQueryData(queryKeyUserBookRatings);

    // Optimistically update to the new value
    const userBookRating: UserBookRatings = {
      id: "",
      is_upvote: true,
      rating_id: "",
      user_id: "",
    };

    queryClient.setQueryData(queryKeyUserBookRatings, () => [userBookRating]);

    return { previousUserBookRatingsData };
  };

  // Opimistically increases the count for the number of upvotes
  const makeOptimisticBookRatingChange = async () => {
    // Cancel any outgoing refetches
    // (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries({
      queryKey: queryKeyBookRating,
    });

    // Snapshot the previous value
  };

  const mutation = useMutation({
    mutationFn: async ({ userId, bookId }: MutationProps) =>
      await upvoteBookRating(userId, bookId),

    onMutate: async () => {
      await makeOptimisticUserUpvoteChange();
    },

    onError: (error, _, context) => {
      // Resets the optimsitic changes assocaited with user book ratings
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const castedContext = context as any;
      const previousUserBookRatingsData =
        castedContext.previousUserBookRatingsData as UserGetUserBookRatingsByUserIdAndRatingIdData;
      queryClient.setQueryData(
        queryKeyUserBookRatings,
        previousUserBookRatingsData
      );

      toast({
        title: "Failed to Upvote Book",
        description: error.message,
        variant: "destructive",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyBookRating,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeyUserBookRatings,
      });
    },
  });

  return mutation;
};
