import { useState } from "react";
import { useGetUserBorrowDataByUserName } from "@/hooks/borrow/useGetUserBorrowDataByUserName";
import { Borrow } from "@/types/supabaseTypes";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { BorrowBookDisplay } from "@/components/Display/BorrowBookDisplay";
import { StudentPill } from "@/components/StudentSearch/StudentPill";
import { Error } from "@/components/Error";

import { useDebounce } from "@uidotdev/usehooks";

/**
 * This component allows an admin to search for a user by their email address and view their borrow statistics and history.
 * It uses the `useGetUserBorrowDataByUserEmail` hook to fetch user data based on the email query.
 */
export const SearchStudentAdminPage = () => {
  const [userNameQuery, setUserNameQuery] = useState<string>("");
  const debouncedUserNameQuery = useDebounce(userNameQuery, 400);

  const { isError, isLoading, data } =
    useGetUserBorrowDataByUserName(debouncedUserNameQuery);
  const [currentIndexOUserBorrow, setCurrentIndexOUserBorrow] =
    useState<number>();

  const usersFoundBySearchQuery = data?.userMetaData;
  let username;
  let userStatistics;
  let borrows;

  if (currentIndexOUserBorrow !== undefined) {
    username = data?.userMetaData[currentIndexOUserBorrow].user_name;
    userStatistics = data?.borrowStatsArr[currentIndexOUserBorrow];
    borrows = data?.borrowsData[currentIndexOUserBorrow];
  }

  const hasSelectedUser = currentIndexOUserBorrow !== undefined;
  const resultsFoundByQuery = usersFoundBySearchQuery && 
    usersFoundBySearchQuery?.length > 0;
  const errorMessage = debouncedUserNameQuery?.length <= 0 ? 
    "Search a user first" : 
    "No users found";

  return (
    <div className="w-[80%] p-4 font-outfit">
      <div className="p-4 rounded-md">
        <h1 className="text-4xl text-white">Search User</h1>
        {/* Horizontal separator */}
        <Separator className="w-full bg-gray-500 my-5" />
        <Input
          onChange={(e) => {
            setCurrentIndexOUserBorrow(undefined);
            setUserNameQuery(e.target.value);
          }}
          value={userNameQuery}
          type="text"
          placeholder="Search user by their name"
          className="w-full px-4 py-2 mb-4 rounded text-lg"
        />

        <p className="text-xl">{isError}</p>

        {/* User selection */}
        {!hasSelectedUser && (
          <div className="grid grid-cols-4 gap-5">
            {usersFoundBySearchQuery?.map((userMetaData, index) => {
              const stats = data?.borrowStatsArr[index];

              return <StudentPill
                userName={userMetaData.user_name}
                borrowedAmount={stats?.borrowed}
                returnedAmount={stats?.returned}
                missingAmount={stats?.missing}
                onClick={() => setCurrentIndexOUserBorrow(index)}
              />
            })}
          </div>
        )}

        {/* Error when there is no usernames*/}
        {!resultsFoundByQuery && <Error
          errorMessage={errorMessage}
          returnHome={false}
        />}

        {/* BORROWS */}
        {/* Display search results if available */}
        {hasSelectedUser && (
          <div className="text-white">
            <div className="my-[20px] p-2">
              <h2 className="text-3xl mb-5">
                Name: {isLoading ? "loading" : username}
              </h2>

              {/* Display borrow statistics */}
              <div className="flex text-lg text-gray-700">
                <p className="p-1 px-4 mx-1 rounded-full bg-white">
                  Borrowed:{" "}
                  <span className="font-bold text-black">
                    {userStatistics?.borrowed}
                  </span>
                </p>
                <p className="p-1 px-4 mx-1 rounded-full bg-white text-black">
                  Returned:{" "}
                  <span className="font-bold">{userStatistics?.returned}</span>
                </p>
                <p className="p-1 px-4 mx-1 rounded-full bg-orange-700 text-white">
                  Missing:{" "}
                  <span className="font-bold">{userStatistics?.missing}</span>
                </p>
              </div>
            </div>

            {/* Display borrow history */}
            {!isLoading ? (
              <ScrollArea className="bg-transparent h-[50vh]">
                {borrows?.map((borrow: Borrow, key: number) => {
                  return <BorrowBookDisplay bookData={borrow} key={key} />;
                })}
              </ScrollArea>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
