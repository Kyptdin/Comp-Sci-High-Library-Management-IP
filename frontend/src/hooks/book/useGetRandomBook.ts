import { getRandomBook } from "@/services/bookService";
import { useQuery } from "@tanstack/react-query";

export const useGetRandomBook = () => {
  const query = useQuery({
    queryKey: ["getRandomBook"],
    queryFn: async () => await getRandomBook(),
  });

  return query;
};
