import { searchBookBySimilarTitle } from "@/services/bookService";
import { useQuery } from "@tanstack/react-query";

export const useSearchBookBySimilarTitle = (
  queryString: string | undefined
) => {
  const query = useQuery({
    queryKey: ["searchBookBySimilarTitle", queryString],
    queryFn: async () => {
      if (!queryString) return null;
      return await searchBookBySimilarTitle(queryString);
    },
  });
  return query;
};
