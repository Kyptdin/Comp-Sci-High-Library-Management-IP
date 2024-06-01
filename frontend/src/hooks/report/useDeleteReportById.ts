import { useToast } from "@/components/ui/use-toast";
import { deleteReportById } from "@/services/reportService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteReportById = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteReportById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllReportsWithPagination"],
      });
      toast({
        title: "Successfully Deleted Report",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Delete Report",
        description: error.message,
      });
    },
  });

  return mutation;
};
