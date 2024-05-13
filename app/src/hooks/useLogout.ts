import { logoutUser } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      alert("Was a successfull logout");
      queryClient.resetQueries();
      navigate("/");
    },
  });
  return mutation;
};
