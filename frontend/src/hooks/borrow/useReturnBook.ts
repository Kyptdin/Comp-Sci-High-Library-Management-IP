/**
 * This file contains a custom React Query hook `useReturnBook`
 * that handles the logic for returning a borrowed book.
 *
 * Dependencies:
 * - `returnBorrowedBook` from `@/services/borrowService` to return a borrowed book.
 * - `useToast` from `@/components/ui/use-toast` for displaying toast messages.
 * - `useMutation` and `useQueryClient` from `@tanstack/react-query` for managing mutations and queries.
 */

import { useToast } from "@/components/ui/use-toast";
import { returnBorrowedBook } from "@/services/borrowService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Interface defining the properties required to return a book.
 */
export interface ReturnBookProps {
  userId: string | undefined;
  isbn: string | undefined;
}

/**
 * A custom React Query hook that handles the logic for returning a borrowed book.
 *
 * @param isbn The ISBN of the book to be returned.
 * @param userId The user ID of the user returning the book.
 * @returns A React Query mutation object for returning a book.
 */
export const useReturnBook = (
  isbn: string | undefined,
  userId: string | undefined
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: returnBorrowedBook,
    onSuccess: () => {
      // Display success toast message
      toast({
        variant: "default",
        title: "Successfully Returned Book",
        description: "Your book has been returned.",
      });
      // Invalidate the query for borrows not returned by the user and ISBN
      queryClient.invalidateQueries({
        queryKey: ["getBorrowsNotReturnedByUserIdAndIsbn", userId, isbn],
      });
    },
    onError: (error) => {
      // Display error toast message
      toast({
        variant: "destructive",
        title: "Failed to Return Book.",
        description: error.message,
      });
    },
  });

  return mutation;
};
