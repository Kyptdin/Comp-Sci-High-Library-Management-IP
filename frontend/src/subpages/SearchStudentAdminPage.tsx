import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useGetUserBorrowDataByUserName } from "@/hooks/borrow/useGetUserBorrowDataByUserName";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Borrow } from "@/types/supabaseTypes";
import { BorrowBookDisplay } from "@/components/BorrowBookDisplay";

/**
 * This component allows an admin to search for a user by their email address and view their borrow statistics and history.
 * It uses the `useGetUserBorrowDataByUserEmail` hook to fetch user data based on the email query.
 */
export const SearchStudentAdminPage = () => {
  const [userNameQuery, setUserNameQuery] = useState<string>("");
  const { isError, isLoading, data } =
    useGetUserBorrowDataByUserName(userNameQuery);
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
        {currentIndexOUserBorrow === undefined && (
          <div className="grid grid-cols-4 gap-5">
            {usersFoundBySearchQuery?.map((userMetaData, index) => {
              const stats = data?.borrowStatsArr[index];
              return (
                <Card
                  className="cursor-pointer"
                  onClick={() => {
                    setCurrentIndexOUserBorrow(index);
                  }}
                >
                  <CardHeader>
                    <CardTitle>{userMetaData.user_name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <span className="font-semibold">Borrowed:</span>{" "}
                      {stats?.borrowed}
                    </p>
                    <p>
                      <span className="font-semibold">Returned:</span>
                      {stats?.returned}
                    </p>
                    <p>
                      <span className="font-semibold">Missing:</span>
                      {stats?.missing}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* BORROWS */}
        {/* Display search results if available */}
        {currentIndexOUserBorrow !== undefined && (
          <div className="text-white">
            <div className="my-[40px] p-2">
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
              <ScrollArea className="bg-transparent h-[55vh]">
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
