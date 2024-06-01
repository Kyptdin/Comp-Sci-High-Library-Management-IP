import { getAllReportsWithPagination } from "@/services/reportService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllReportsWithPagination = (
  startIndex: number, 
  endIndex:number
) => {
  const query = useQuery({
    queryFn: () => getAllReportsWithPagination(startIndex, endIndex),
    queryKey: ["getAllReportsWithPagination"],
  });

  return query;
};
