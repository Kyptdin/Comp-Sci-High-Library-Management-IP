import { useToast } from "@/components/ui/use-toast";
import { returnBorrowedBook } from "@/services/borrowService";

import { useMutation } from "@tanstack/react-query";

export interface ReturnBookProps {
  userId: string | undefined;
  isbn: string | undefined;
}

export const useReturnBook = () => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: returnBorrowedBook,
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Successful Returned Book",
        description: "Your book has been returned.",
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
