import { getAllReportsWithPagination } from "@/services/reportService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllReportsWithPagination = () => {
  const query = useQuery({
    queryFn: getAllReportsWithPagination,
    queryKey: ["getAllReportsWithPagination"],
  });

  return query;
};
