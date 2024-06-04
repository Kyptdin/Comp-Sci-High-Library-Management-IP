/**
 * This file contains a custom React Query hook `useDeleteReportById`
 * that handles the logic for deleting a report by its ID.
 *
 * Dependencies:
 * - `deleteReportById` from `@/services/reportService` to delete a report by its ID.
 * - `useToast` from `@/components/ui/use-toast` for displaying toast messages.
 * - `useMutation` and `useQueryClient` from `@tanstack/react-query` for managing mutations and queries.
 */

import { useToast } from "@/components/ui/use-toast";
import { deleteReportById } from "@/services/reportService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * A custom React Query hook that handles the logic for deleting a report by its ID.
 *
 * @returns A React Query mutation object for deleting a report.
 */
export const useDeleteReportById = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteReportById,
    onSuccess: () => {
      // Invalidate the query for all reports with pagination
      queryClient.invalidateQueries({
        queryKey: ["getAllReportsWithPagination"],
      });
      // Display success toast message
      toast({
        title: "Successfully Deleted Report",
      });
    },
    onError: (error) => {
      // Display error toast message
      toast({
        title: "Failed to Delete Report",
        description: error.message,
      });
    },
  });

  return mutation;
};
