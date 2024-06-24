import { useToast } from "@/components/ui/use-toast";
import { sendBookRequest } from "@/services/bookRequestService";
import { useMutation } from "@tanstack/react-query";

export interface RequestBookMutationProps {
  studentEmail: string;
  studentName: string;
  bookName: string;
  reason: string;
  explanation: string;
  requestType: string;
  userId: string;
  bookId: string;
}
export const useRequestBook = () => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (bookRequestData: RequestBookMutationProps) => {
      return await sendBookRequest(bookRequestData);
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
