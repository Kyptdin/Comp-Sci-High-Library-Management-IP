import { useToast } from "@/components/ui/use-toast";
import { createReport } from "@/services/reportService";
import { useMutation } from "@tanstack/react-query";

/*REPORT MISSING (DONE)
  No rules exist for report missing
  */
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
      console.log(error.message);
      toast({
        title: "Failed to Create Report",
        content: error.message,
      });
    },
  });

  return mutation;
};
