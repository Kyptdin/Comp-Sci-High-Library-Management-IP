import { useToast } from "@/components/ui/use-toast";
import { deleteBookByISBN } from "@/services/bookService";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBook = () => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteBookByISBN,
    onSuccess: () => {
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
