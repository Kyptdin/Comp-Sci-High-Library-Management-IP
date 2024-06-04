import { massCreateBooks } from "@/services/bookService";
import { useMutation } from "@tanstack/react-query";

/**
 * Custom hook to mass create books.
 * @returns {Object} Object containing the mutation function.
 */
export const useMassCreateBooks = () => {
  const mutation = useMutation({
    mutationFn: massCreateBooks,
  });

  return mutation;
};
