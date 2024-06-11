import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { createBook } from "@/services/bookService";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for creating a new book.
 * @returns  Object containing the book creation mutation.
 */
export const useCreateBook = (
  displayToast?: boolean
): UseMutationResult<
  {
    id: string;
    title: string;
    total_copies_within_school: number;
  }[],
  Error,
  {
    id: string;
    title: string;
    total_copies_within_school: number;
  },
  unknown
> => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createBook,
    mutationKey: ["createBook"],
    onSuccess: (data) => {
      const viewPage = () => navigate(`/inspect/${data[0].id}`);

      if (!displayToast) return;
      toast({
        variant: "default",
        title: "Successfully Created Book",
        description: "Your book has been created",
        action: (
          <ToastAction altText="View page" onClick={viewPage}>
            View page
          </ToastAction>
        ),
      });
    },
    onError: (error) => {
      if (!displayToast) return;
      toast({
        variant: "destructive",
        title: "Failed to Create Book",
        description: error.message,
      });
    },
  });
  return mutation;
};
