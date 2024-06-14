import { getBorrowsByUserId } from "@/services/borrowService";
import {
  createStatsForBooksBorrowed,
  searchUserBySimilarUsername,
} from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useGetUserBorrowDataByUserName = (userName: string) => {
  const query = useQuery({
    queryKey: ["useBorrowDataAndMetaDataForSearchedUsername", userName],
    queryFn: async () => {
      if (userName.length === 0) return null;

      const usersFoundByUsername = await searchUserBySimilarUsername(userName);
      const promisesBorrowDataForUsers = usersFoundByUsername.map(
        (userData) => {
          return getBorrowsByUserId(userData.user_id);
        }
      );
      const borrowDataForUsers = await Promise.all(promisesBorrowDataForUsers);

      const borrowStatsArr = borrowDataForUsers.map((borrows) => {
        const borrowStats = createStatsForBooksBorrowed(borrows);
        return borrowStats;
      });

      return {
        userMetaData: usersFoundByUsername,
        borrowsData: borrowDataForUsers,
        borrowStatsArr: borrowStatsArr,
      };
    },
  });

  return query;
};
