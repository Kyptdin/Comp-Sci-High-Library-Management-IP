import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BorrowBookDisplay } from "@/components/BorrowBookDisplay";
import { useEffect, useState } from "react";
import { useGetUserBorrowDataByUserEmail } from "@/hooks/borrow/useGetUserBorrowDataByUserEmail";
import { Borrow } from "@/types/supabaseTypes";
import { searchUserBySimilarUsername } from "@/services/userService";

/**
 * This component allows an admin to search for a user by their email address and view their borrow statistics and history.
 * It uses the `useGetUserBorrowDataByUserEmail` hook to fetch user data based on the email query.
 */
export const SearchStudentAdminPage = () => {
  const [emailQuery, setEmailQuery] = useState<string>("");
  // Fetch user data based on the email query
  const {
    data: userDataFromSearch,
    isLoading,
    isError,
  } = useGetUserBorrowDataByUserEmail(emailQuery);

  useEffect(() => {
    searchUserBySimilarUsername("Isaa");
  }, []);

  // Extract user data
  const username = userDataFromSearch?.userMetaData[0].user_name;
  const borrows = userDataFromSearch?.borrrows;
  const userStatistics = userDataFromSearch?.borrowStats;
  const showSearchResults = userDataFromSearch && !isLoading;

  return (
    <div className="w-[80%] p-4 font-outfit">
      <div className=" p-4 rounded-md">
        <h1 className="text-4xl text-white">Search User</h1>
        {/* Horizontal separator */}
        <Separator className="w-full bg-gray-500 my-5" />
        <Input
          onChange={(e) => setEmailQuery(e.target.value)}
          value={emailQuery}
          type="text"
          placeholder="Search user by their email"
          className="w-full px-4 py-2 mb-4 rounded text-lg"
        />
        {/* Display error message if there is an error */}
        <p className="text-xl">{isError}</p>
        {/* Display search results if available */}
        {showSearchResults && (
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
