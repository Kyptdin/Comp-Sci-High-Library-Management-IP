import { useToast } from "@/components/ui/use-toast";
import { createBook } from "@/services/bookService";
import { useMutation } from "@tanstack/react-query";

export const useCreateBook = () => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: createBook,
    mutationKey: ["createBook"],
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Successful Created Book",
        description: "Your book has been created",
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
