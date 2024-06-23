import { useToast } from "@/components/ui/use-toast";
import { requestBook } from "@/services/bookRequestService";
import { useMutation } from "@tanstack/react-query";

export interface RequestBookMutationProps {
  userId: string;
  bookId: string;
  reason: string;
  explanation: string;
  requestType: string;
}

export const useRequestBook = () => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (bookRequestData: RequestBookMutationProps) => {
      return await requestBook(bookRequestData);
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
