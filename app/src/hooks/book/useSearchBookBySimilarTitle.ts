import { searchBookBySimilarTitle } from "@/services/bookService";
import { useQuery } from "@tanstack/react-query";

export const useSearchBookBySimilarTitle = (queryString: string) => {
  const query = useQuery({
    queryKey: ["searchBookBySimilarTitle", queryString],
    queryFn: async () => {
      return await searchBookBySimilarTitle(queryString);
    },
  });
  return query;
};
