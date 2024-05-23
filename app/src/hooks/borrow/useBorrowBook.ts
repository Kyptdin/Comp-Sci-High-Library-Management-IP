import { useMutation } from "@tanstack/react-query";
import { borrowBook } from "@/services/bookService";

export const useBorrowBook = () => {
  const mutation = useMutation({
    mutationFn: borrowBook,
  });

  return mutation;
};
