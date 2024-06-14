import { searchUserBySimilarUsername } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useGetUserBorrowDataByUserName = (userName: string) => {
  useQuery({
    queryKey: ["useBorrowDataAndMetaDataForSearchedUsername", userName],
    queryFn: async () => {
      const usersFoundByUsername = await searchUserBySimilarUsername(userName);

      const borrowDataForUsers = usersFoundByUsername.map((userData) => {});
    },
  });
};
