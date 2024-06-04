import { logoutUser } from "@/services/auth";
import { AuthError } from "@supabase/supabase-js";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for logging out a user.
 * Uses React Query for managing mutations and navigation.
 * @returns {Mutation} The mutation object for logging out.
 */
export const useLogout = (): UseMutationResult<
  AuthError | null,
  Error,
  void,
  unknown
> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Reset all queries to ensure fresh data when user logs back in
      queryClient.resetQueries();
      navigate("/");
    },
  });

  return mutation;
};
