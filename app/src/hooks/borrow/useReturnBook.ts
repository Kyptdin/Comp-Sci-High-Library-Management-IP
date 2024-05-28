import { useToast } from "@/components/ui/use-toast";
import { returnBorrowedBook } from "@/services/borrowService";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface ReturnBookProps {
  userId: string | undefined;
  isbn: string | undefined;
}

export const useReturnBook = (
  isbn: string | undefined,
  userId: string | undefined
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: returnBorrowedBook,
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Successfully Returned Book",
        description: "Your book has been returned.",
      });
      queryClient.invalidateQueries({
        queryKey: ["getBorrowsNotReturnedByUserIdAndIsbn", userId, isbn],
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to Return Book.",
        description: error.message,
      });
    },
  });

  return mutation;
};
