import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"

import { BookAdminDisplay } from "@/components/BookAdminDisplay";

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

          <ScrollArea className="bg-transparent h-[60vh]">
            <BookAdminDisplay/>
            <BookAdminDisplay/>
            <BookAdminDisplay/>
            <BookAdminDisplay/>
          </ScrollArea>

        </div>
      </div>
    </div>
  );
};
