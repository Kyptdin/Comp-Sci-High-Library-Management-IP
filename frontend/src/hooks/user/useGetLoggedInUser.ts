/**
 * This file contains a custom React Query hook `useGetLoggedInUser` for fetching the currently logged-in user.
 *
 * Dependencies:
 * - `getLoggedInUser` from `@/services/userService` to fetch the logged-in user's data.
 * - `useQuery` from `@tanstack/react-query` for handling query operations.
 *
 * Fetching Logged-In User:
 * - When called, this hook initiates a query to fetch the currently logged-in user's data.
 * - It uses the `getLoggedInUser` service to send the request to the server.
 * - It includes a retry delay of 1 millisecond.
 *
 * @returns A React Query query object for fetching the logged-in user's data.
 */
import { getLoggedInUser } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useGetLoggedInUser = () => {
  const query = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: getLoggedInUser,
    retryDelay: 1,
  });

  return query;
};
