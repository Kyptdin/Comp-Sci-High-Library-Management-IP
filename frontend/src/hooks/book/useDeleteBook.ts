import { useToast } from "@/components/ui/use-toast";
import { deleteBookByISBN } from "@/services/bookService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBook = (searchQuery: string) => {
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
