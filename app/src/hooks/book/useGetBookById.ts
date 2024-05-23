import { getBookById } from "@/services/bookService";
import { useQuery } from "@tanstack/react-query";

export const useGetBookById = (id: string | undefined) => {
  const query = useQuery({
    queryKey: ["searchBookById", id],
    queryFn: async () => {
      if (!id) return null;
      return await getBookById(id);
    },
  });
  return query;
};
