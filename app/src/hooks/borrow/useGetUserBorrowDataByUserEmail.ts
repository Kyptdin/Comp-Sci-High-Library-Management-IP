import { readBorrowsByUserId } from "@/services/borrowService";
import {
  createStatsForBooksBorrowed,
  readUserByEmail,
} from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useGetUserBorrowDataByUserEmail = (email: string) => {
  const query = useQuery({
    queryKey: ["useBorrowDataAndMetaDataForSearchedEmail", email],
    queryFn: async () => {
      // Search the user's meta data using their email
      const userMetaData = await readUserByEmail(email);
      console.log("User meta data is below");
      console.log(userMetaData);
      // Search all the borrows of the user
      const borrrows = await readBorrowsByUserId(userMetaData[0].user_id);
      // Create the stats for all the borrows
      const borrowStats = createStatsForBooksBorrowed(borrrows);
      return { userMetaData, borrrows, borrowStats };
    },
  });
  return query;
};
