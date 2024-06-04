import { toast } from "@/components/ui/use-toast";
import { editBookByISBN } from "@/services/bookService";
import { BooksUpdate } from "@/types/supabaseTypes";
import { useMutation } from "@tanstack/react-query";

/**
 * Custom hook for editing a book by ISBN.
 * @returns {Object} Object containing the book edit mutation.
 */
export const useEditBook = () => {
  const mutation = useMutation({
    mutationFn: editBookByISBN,
    onSuccess: (data) => {
      toast({
        variant: "default",
        title: "Successfully Edited Book",
        description: `${data[0].title} has been edited`,
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

/**
 * @type {EditBooksProp} - Interface for the props required to edit a book.
 */
export interface EditBooksProp {
  isbn: string;
  newBookData: BooksUpdate;
}
