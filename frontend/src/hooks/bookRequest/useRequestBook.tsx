import { useToast } from "@/components/ui/use-toast";
import { requestBook } from "@/services/bookRequestService";
import { useMutation } from "@tanstack/react-query";

interface MutationProps {
  userId: string;
  bookId: string;
  reason: string;
  explanation: string;
}
export const useRequestBook = () => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async ({
      userId,
      bookId,
      reason,
      explanation,
    }: MutationProps) => {
      return await requestBook(userId, bookId, reason, explanation);
    },
    onError: (error) => {
      const errorMessage = error.message.includes("already")
        ? error.message
        : "";

      toast({
        title: "Failed to Request Book",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  return mutation;
};
