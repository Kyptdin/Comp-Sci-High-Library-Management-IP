import { getLoggedInUser } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useGetLoggedInUser = () => {
  const query = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: getLoggedInUser,
  });

  return query;
};
