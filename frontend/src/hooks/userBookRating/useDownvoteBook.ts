import { useToast } from "@/components/ui/use-toast";
import { downvoteBook } from "@/services/userBookRatingService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface MutationProps {
  userId: string;
  bookId: string;
}

export const useDownvoteBook = (
  bookId: string | undefined,
  userId: string | undefined
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ userId, bookId }: MutationProps) =>
      await downvoteBook(userId, bookId),
    onError: () => {
      toast({ title: "Failed to Downvote Book", variant: "destructive" });
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
