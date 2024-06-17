import { useToast } from "@/components/ui/use-toast";
import { upvoteBookRating } from "@/services/bookRatingService";
import { useMutation } from "@tanstack/react-query";

interface MutationProps {
  userId: string;
  bookId: string;
}

export const useUpvoteBook = () => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async ({ userId, bookId }: MutationProps) =>
      await upvoteBookRating(userId, bookId),
    onError: (error) => {
      console.log(error.stack);
      toast({
        title: "Failed to Upvote Book",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
