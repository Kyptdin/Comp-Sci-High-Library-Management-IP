import { useToast } from "@/components/ui/use-toast";
import { requestBook } from "@/services/bookRequestService";
import { useMutation } from "@tanstack/react-query";

interface MutationProps {
  userId: string;
  bookId: string;
  reason: string;
  explanation: string;
}
// TODO: Edit this to use deno because we need emailing with resend api
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
    onSuccess: () => {
      toast({
        title: "Successfully Created Book Request",
        description: "Please check your email for confirmation.",
      });
    },
  });

  return mutation;
};
