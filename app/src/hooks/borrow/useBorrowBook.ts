import { useMutation } from "@tanstack/react-query";
import { borrowBook } from "@/services/bookService";
import { useToast } from "@/components/ui/use-toast";

export const useBorrowBook = () => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: borrowBook,
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Successfully Borrowed Book",
        description: "You have successfully borrowed the book.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to Borrow Book",
        description: error.message + ".",
      });
    },
  });

  return mutation;
};
