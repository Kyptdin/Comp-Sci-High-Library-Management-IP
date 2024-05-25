import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { BorrowBookDisplay } from "@/components/BorrowBookDisplay";
import { useState } from "react";
import { useGetUserBorrowDataByUserEmail } from "@/hooks/borrow/useGetUserBorrowDataByUserEmail";
import { Borrow } from "@/types/supabaseTypes";

export const SearchStudentAdminPage = () => {
  const [emailQuery, setEmailQuery] = useState<string>("");
  const {
    data: userDataFromSearch,
    isLoading,
    isError,
  } = useGetUserBorrowDataByUserEmail(emailQuery);
  const username = userDataFromSearch?.userMetaData[0].user_name;
  const borrows = userDataFromSearch?.borrrows;
  const userStatistics = userDataFromSearch?.borrowStats;
  const showSearchResults = userDataFromSearch && !isLoading;

  return (
    <div className="w-[80%] p-4 font-outfit">
      <div className=" p-4 rounded-md">
        <h1 className="text-4xl text-white">Search Student</h1>
        <Separator className="w-full bg-gray-500 my-5" />
        <Input
          onChange={(e) => setEmailQuery(e.target.value)}
          value={emailQuery}
          type="text"
          placeholder="Search user by their email"
          className="w-full px-4 py-2 mb-4 rounded text-lg"
        />
        <p className="text-xl">{isError}</p>
        {showSearchResults && (
          <div className="text-white">
            <div className="my-[40px] p-2">
              <h2 className="text-3xl mb-5">
                Name: {isLoading ? "loading" : username}
              </h2>

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
