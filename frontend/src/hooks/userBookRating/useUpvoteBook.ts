import { useToast } from "@/components/ui/use-toast";
import { upvoteBookRating } from "@/services/userBookRatingService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface MutationProps {
  userId: string;
  bookId: string;
}

export const useUpvoteBook = (
  bookId: string | undefined,
  userId: string | undefined
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ userId, bookId }: MutationProps) => {
      if (!bookId) return null;
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
        queryKey: ["getBookUpvoteAndDownvoteById", bookId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserLatestRatingByBookIdAndUserId", bookId, userId],
      });
    },
  });

  return mutation;
};
