import { useMutation, useQueryClient } from "@tanstack/react-query";
import { borrowBook } from "@/services/bookService";
import { useToast } from "@/components/ui/use-toast";

/**
 * Custom hook to borrow a book.
 * @param {string | undefined} isbn - The ISBN of the book to borrow.
 * @param {string | undefined} userId - The ID of the user borrowing the book.
 * @returns Object containing the mutation state.
 */
export const useBorrowBook = (
  isbn: string | undefined,
  userId: string | undefined
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: borrowBook,
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Successfully Borrowed Book",
        description: "You have successfully borrowed the book.",
      });
      queryClient.invalidateQueries({
        queryKey: ["getBorrowsNotReturnedByUserIdAndIsbn", userId, isbn],
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to Borrow Book",
        description: error.message,
      });
    },
  });

  return mutation;
};
