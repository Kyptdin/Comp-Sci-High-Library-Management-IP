import { Input } from "@/components/ui/input";

import { BookDisplaySkeleton } from "@/components/BookDisplaySkeleton";

export const SearchStudentAdminPage = () => {
  return (
    <div className="w-[80%] p-4 font-outfit">
      <div className=" p-4 rounded-md">

        <Input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 mb-4 rounded "
        />

        <div className="text-white">
          <div className="my-[40px] p-2">
            <h2 className="text-3xl mb-5">Name: John Doe</h2>

            <div className="flex text-lg text-gray-700">
              <p className="p-1 px-4 mx-1 rounded-full bg-white">
                Missing: <span className="font-bold text-black">2</span>
              </p>
              <p className="p-1 px-4 mx-1 rounded-full bg-white">
                Borrowed: <span className="font-bold text-black">6</span>
              </p>
              <p className="p-1 px-4 mx-1 rounded-full bg-white">
                Returned: <span className="font-bold text-black">4</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="p-2 rounded-[35px]">
              <BookDisplaySkeleton className="w-full p-0 m-0"/>

              <div className="px-5 gap-2 py-2 pb-5 text-xs flex flex-wrap">
                <p className="px-4 py-1 bg-orange-700 rounded-full">BORROWED</p>
                <p className="px-4 py-1 bg-red-800 rounded-full">MISSING</p>
                <p className="px-4 py-1 bg-green-800 rounded-full">RETURNED</p>
              </div>
            </div>

            <div className="p-2 rounded-[35px]">
              <BookDisplaySkeleton className="w-full p-0 m-0"/>

              <div className="px-5 gap-2 py-2 pb-5 text-xs flex flex-wrap">
                <p className="px-4 py-1 bg-orange-700 rounded-full">BORROWED</p>
                <p className="px-4 py-1 bg-red-800 rounded-full">MISSING</p>
                <p className="px-4 py-1 bg-green-800 rounded-full">RETURNED</p>
              </div>
            </div>

            <div className="p-2 rounded-[35px]">
              <BookDisplaySkeleton className="w-full p-0 m-0"/>

              <div className="px-5 gap-2 py-2 pb-5 text-xs flex flex-wrap">
                <p className="px-4 py-1 bg-orange-700 rounded-full">BORROWED</p>
                <p className="px-4 py-1 bg-red-800 rounded-full">MISSING</p>
                <p className="px-4 py-1 bg-green-800 rounded-full">RETURNED</p>
              </div>
            </div>

            <div className="p-2 rounded-[35px]">
              <BookDisplaySkeleton className="w-full p-0 m-0"/>

              <div className="px-5 gap-2 py-2 pb-5 text-xs flex flex-wrap">
                <p className="px-4 py-1 bg-orange-700 rounded-full">BORROWED</p>
                <p className="px-4 py-1 bg-red-800 rounded-full">MISSING</p>
                <p className="px-4 py-1 bg-green-800 rounded-full">RETURNED</p>
              </div>
            </div>
            <div className="p-2 rounded-[35px]">
              <BookDisplaySkeleton className="w-full p-0 m-0"/>

              <div className="px-5 gap-2 py-2 pb-5 text-xs flex flex-wrap">
                <p className="px-4 py-1 bg-orange-700 rounded-full">BORROWED</p>
                <p className="px-4 py-1 bg-red-800 rounded-full">MISSING</p>
                <p className="px-4 py-1 bg-green-800 rounded-full">RETURNED</p>
              </div>
            </div>

            <div className="p-2 rounded-[35px]">
              <BookDisplaySkeleton className="w-full p-0 m-0"/>

              <div className="px-5 gap-2 py-2 pb-5 text-xs flex flex-wrap">
                <p className="px-4 py-1 bg-orange-700 rounded-full">BORROWED</p>
                <p className="px-4 py-1 bg-red-800 rounded-full">MISSING</p>
                <p className="px-4 py-1 bg-green-800 rounded-full">RETURNED</p>
              </div>
            </div>

            <div className="p-2 rounded-[35px]">
              <BookDisplaySkeleton className="w-full p-0 m-0"/>

              <div className="px-5 gap-2 py-2 pb-5 text-xs flex flex-wrap">
                <p className="px-4 py-1 bg-orange-700 rounded-full">BORROWED</p>
                <p className="px-4 py-1 bg-red-800 rounded-full">MISSING</p>
                <p className="px-4 py-1 bg-green-800 rounded-full">RETURNED</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
