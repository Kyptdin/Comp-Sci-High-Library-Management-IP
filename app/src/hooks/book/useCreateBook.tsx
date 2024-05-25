import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { createBook } from "@/services/bookService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCreateBook = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createBook,
    mutationKey: ["createBook"],
    onSuccess: (data) => {
      const viewPage = () => navigate(`/inspect/${data[0].id}`);

      toast({
        variant: "default",
        title: "Successfully Created Book",
        description: "Your b</ToastActionElement>ook has been created",
        action: (
          <ToastAction altText="View page" onClick={viewPage}>
            View page
          </ToastAction>
        ),
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to Create Book",
        description: error.message,
      });
    },
  });
  return mutation;
};
