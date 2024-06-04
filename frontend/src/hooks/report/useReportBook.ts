/**
 * This file contains a custom React Query hook `useReportBook` for reporting a missing book.
 *
 * Dependencies:
 * - `createReport` from `@/services/reportService` to create a report for a missing book.
 * - `useToast` from `@/components/ui/use-toast` for displaying toast messages.
 * - `useMutation` from `@tanstack/react-query` for handling mutation operations.
 *
 * Reporting Missing Book:
 * - When called, this hook initiates a mutation to create a report for a missing book.
 * - It uses the `createReport` service to send the request to the server.
 * - On success, it displays a toast message indicating that the report was successfully created.
 * - On error, it displays a toast message indicating that the report creation failed.
 *
 * @returns A React Query mutation object for reporting a missing book.
 */
import { useToast } from "@/components/ui/use-toast";
import { createReport } from "@/services/reportService";
import { useMutation } from "@tanstack/react-query";

export const useReportBook = () => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: createReport,
    onSuccess: (data) => {
      toast({
        title: "Successfully Created Report",
        content: `Created report for the reason ${data[0].reason}`,
      });
    },
    onError(error) {
      toast({
        title: "Failed to Create Report",
        content: error.message,
      });
    },
  });

  return mutation;
};
