import { readBorrowsByUserId } from "@/services/borrowService";
import {
  createStatsForBooksBorrowed,
  readUserByEmail,
} from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useGetUserBorrowDataByUserEmail = async (email: string) => {
  useQuery({
    queryKey: ["useBorrowDataAndMetaDataForSearchedEmail"],
    queryFn: async () => {
      // Search the user's meta data using their email
      const userMetaData = await readUserByEmail(email);
      // Search all the borrows of the user
      const borrrows = await readBorrowsByUserId(userMetaData[0].user_id);
      // TODO: Look through the borrows array above and create an array of images for each isbn
      // Create the stats for all the borrows
      const borrowStats = createStatsForBooksBorrowed(borrrows);
      return { userMetaData, borrrows, borrowStats };
    },
  });
};
