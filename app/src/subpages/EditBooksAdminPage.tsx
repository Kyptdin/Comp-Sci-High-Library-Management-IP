import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { EditBookDisplay } from "@/components/EditBookDisplay";

export const EditBooksAdminPage = () => {
  return (
    <div className="text-white w-[80%] p-4">
      <div className="p-4">
        <h1 className="text-4xl">Edit Books</h1>
        <Separator className="w-full bg-gray-500 my-5" />

        <Input
          type="text"
          placeholder="Enter ISBN number"
          className="w-full px-4 py-2 mb-4 rounded text-lg text-black"
        />
      </div>

      <div className="px-4 grid grid-cols-2">
        <EditBookDisplay isbn="0747549559" />
      </div>
    </div>
  );
};
