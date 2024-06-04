import { massCreateBooks } from "@/services/bookService";
import { useMutation } from "@tanstack/react-query";

export const useMassCreateBooks = () => {
  const mutation = useMutation({
    mutationFn: massCreateBooks,
  });

  return mutation;
};
