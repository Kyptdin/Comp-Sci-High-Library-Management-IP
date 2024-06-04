/**
 * This file contains a custom React Query hook `useGetUserBorrowDataByUserEmail`
 * that fetches user's borrow data and metadata based on their email.
 *
 * Dependencies:
 * - `readUserByEmail` from `@/services/userService` to fetch user metadata.
 * - `readBorrowsByUserId` from `@/services/borrowService` to fetch user's borrows.
 * - `createStatsForBooksBorrowed` from `@/services/userService` to create borrow stats.
 * - `useQuery` from `@tanstack/react-query` for managing queries.
 */

import { readBorrowsByUserId } from "@/services/borrowService";
import {
  createStatsForBooksBorrowed,
  readUserByEmail,
} from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

/**
 * A custom React Query hook that fetches user's borrow data and metadata based on their email.
 *
 * @param email The email of the user.
 * @returns A React Query object containing user metadata, borrows, and borrow statistics.
 */
export const useGetUserBorrowDataByUserEmail = (email: string) => {
  const query = useQuery({
    queryKey: ["useBorrowDataAndMetaDataForSearchedEmail", email],
    queryFn: async () => {
      // Search the user's meta data using their email
      const userMetaData = await readUserByEmail(email);
      // Search all the borrows of the user
      const borrrows = await readBorrowsByUserId(userMetaData[0].user_id);
      // Create the stats for all the borrows
      const borrowStats = createStatsForBooksBorrowed(borrrows);
      return { userMetaData, borrrows, borrowStats };
    },
  });
  return query;
};
