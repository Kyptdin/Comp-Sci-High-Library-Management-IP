import { toast } from "@/components/ui/use-toast";
import { editBookByISBN } from "@/services/bookService";
import { BooksUpdate } from "@/types/supabaseTypes";
import { useMutation } from "@tanstack/react-query";

export interface EditBooksProp {
  isbn: string;
  newBookData: BooksUpdate;
}

export const useEditBook = () => {
  const mutation = useMutation({
    mutationFn: editBookByISBN,
    onSuccess: (data) => {
      toast({
        variant: "default",
        title: "Successful Edited Book",
        description: "Your book has been edited.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to Edit Book",
        description: error.message,
      });
    },
  });
  return mutation;
};
