import { useToast } from "@/components/ui/use-toast";
import { upvoteBookRating } from "@/services/bookRatingService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

  const mutation = useMutation({
    mutationFn: async ({ userId, bookId }: MutationProps) => {
      return await upvoteBookRating(userId, bookId);
    },

    onError: (error) => {
      toast({
        title: "Failed to Upvote Book",
        description: error.message,
        variant: "destructive",
      });
    },

    onSettled: () => {
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
