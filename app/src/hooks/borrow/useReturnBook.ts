import { useToast } from "@/components/ui/use-toast";
import { getBorrowsByUserIdAndIsbn } from "@/services/borrowService";
import { useMutation } from "@tanstack/react-query";

interface MutationProps {
  userId: string | undefined;
  isbn: string | undefined;
}

export const useReturnBook = () => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async ({ userId, isbn }: MutationProps) => {
      if (!userId || !isbn) return null;

      const borrowData = await getBorrowsByUserIdAndIsbn(userId, isbn);

      if (borrowData.length === 0) {
        throw new Error(
          "Failed to borrow book. You are not currently borrowing the book"
        );
      }
    },
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
