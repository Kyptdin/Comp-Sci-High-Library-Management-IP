import { useToast } from "@/components/ui/use-toast";
import { upvoteBookRating } from "@/services/bookRatingService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface MutationProps {
  userId: string;
  bookId: string;
}

export const useUpvoteBook = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ userId, bookId }: MutationProps) =>
      await upvoteBookRating(userId, bookId),
    onError: (error) => {
      console.log(error.stack);
      toast({
        title: "Failed to Upvote Book",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getBookRatingByBookId", data[0].id],
      });
    },
  });

  return mutation;
};
