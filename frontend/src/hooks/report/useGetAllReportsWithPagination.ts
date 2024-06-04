/**
 * This file contains a custom React Query hook `useGetAllReportsWithPagination`
 * that fetches all reports with pagination from the server.
 *
 * Dependencies:
 * - `getAllReportsWithPagination` from `@/services/reportService` to fetch reports with pagination.
 * - `useQuery` from `@tanstack/react-query` for managing queries.
 *
 * @param startIndex The start index of the pagination.
 * @param endIndex The end index of the pagination.
 * @returns A React Query query object for fetching all reports with pagination.
 */
import { getAllReportsWithPagination } from "@/services/reportService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllReportsWithPagination = (
  startIndex: number,
  endIndex: number
) => {
  const query = useQuery({
    queryFn: () => getAllReportsWithPagination(startIndex, endIndex),
    queryKey: ["getAllReportsWithPagination"],
  });

  return query;
};
