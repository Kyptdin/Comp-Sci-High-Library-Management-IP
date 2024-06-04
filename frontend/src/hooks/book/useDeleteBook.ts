import { useToast } from "@/components/ui/use-toast";
import { deleteBookByISBN } from "@/services/bookService";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

/**
 * Custom hook for deleting a book by ISBN.
 * @param {string} searchQuery The search query used to find the book.
 * @returns Object containing the book deletion mutation.
 */
export const useDeleteBook = (
  searchQuery: string
): UseMutationResult<void, Error, string, unknown> => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteBookByISBN,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["searchBookBySimilarTitle", searchQuery],
      });
      toast({
        title: "Successfully Deleted Book",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Delete Book",
        description: error.message,
      });
    },
  });

  return mutation;
};
