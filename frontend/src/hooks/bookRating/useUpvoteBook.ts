import { useToast } from "@/components/ui/use-toast";
import { upvoteBookRating } from "@/services/bookRatingService";
import { BookRatings, UserBookRatings } from "@/types/supabaseTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryUserGetUserBookRatingsByUserIdAndRatingIdData } from "../userBookRating/useGetUserBookRatingByUserIdAndRatingId";
import { QueryGetBookRatingByBookId } from "./useGetBookRatingByBookId";
// import { QueryGetBookRatingByBookId } from "./useGetBookRatingByBookId";

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
    const previousUserBookRatingsData: QueryUserGetUserBookRatingsByUserIdAndRatingIdData =
      queryClient.getQueryData(queryKeyUserBookRatings);

    // Optimistically update to the new value
    const userBookRating: UserBookRatings = {
      id: "",
      is_upvote: true,
      rating_id: "",
      user_id: "",
    };

    queryClient.setQueryData(queryKeyUserBookRatings, () => [userBookRating]);

    let userUpvotedBook = null;

    if (
      !previousUserBookRatingsData ||
      previousUserBookRatingsData.length === 0 ||
      previousUserBookRatingsData[0].is_upvote === false
    ) {
      userUpvotedBook = false;
    }

    if (
      previousUserBookRatingsData &&
      previousUserBookRatingsData.length === 0 &&
      previousUserBookRatingsData[0].is_upvote === true
    ) {
      userUpvotedBook = true;
    }

    return {
      previousUserBookRatingsData,
      userUpvotedBook,
    };
  };

  // Opimistically increases the count for the number of upvotes
  const makeOptimisticBookRatingChange = async (
    userUpvotedBook: boolean | null
  ) => {
    // Cancel any outgoing refetches
    // (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries({
      queryKey: queryKeyBookRating,
    });

    // Snapshot the previous value QueryGetBookRatingByBookId
    const previousBookRating: QueryGetBookRatingByBookId =
      queryClient.getQueryData(queryKeyUserBookRatings);

    const previousDownvotes = previousBookRating?.downvotes as number;
    const previousUpvotes = previousBookRating?.upvotes as number;

    // Optimistically update to the new value
    const userBookRating: BookRatings = {
      id: "",
      upvotes: previousUpvotes + 1,
      downvotes:
        userUpvotedBook === false ? previousDownvotes - 1 : previousDownvotes,
    };

    queryClient.setQueryData(queryKeyUserBookRatings, () => [userBookRating]);
    return { previousBookRating };
  };

  const mutation = useMutation({
    mutationFn: async ({ userId, bookId }: MutationProps) =>
      await upvoteBookRating(userId, bookId),

    onMutate: async () => {
      const { previousUserBookRatingsData, userUpvotedBook } =
        await makeOptimisticUserUpvoteChange();

      const { previousBookRating } = await makeOptimisticBookRatingChange(
        userUpvotedBook
      );

      return { previousUserBookRatingsData, previousBookRating };
    },

    onError: (error, _, context) => {
      // Resets the optimsitic changes assocaited with user book ratings
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const castedContext = context as any;
      const previousUserBookRatingsData =
        castedContext.previousUserBookRatingsData as QueryUserGetUserBookRatingsByUserIdAndRatingIdData;
      queryClient.setQueryData(
        queryKeyUserBookRatings,
        previousUserBookRatingsData
      );

      // Resets the optimsitic changes associated with the book ratings
      const previousBookRatingsData =
        castedContext.previousUserBookRatingsData as QueryGetBookRatingByBookId;
      queryClient.setQueryData(queryKeyBookRating, previousBookRatingsData);

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
