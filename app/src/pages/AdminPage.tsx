import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950 flex flex-col">
      <Navbar showNavbar={false} />
      <div className="flex-grow flex">
        {/* Sidebar */}
        <div className="w-[20%] p-4 space-y-4">
          <Button className="w-full bg-gray-600 text-white py-4 text-lg rounded hover:bg-gray-500 transition duration-200">
            Search Student
          </Button>
          <Button className="w-full bg-gray-600 text-white py-4 text-lg rounded hover:bg-gray-500 transition duration-200">
            Add Books
          </Button>
          <Button className="w-full bg-gray-600 text-white py-4 text-lg rounded hover:bg-gray-500 transition duration-200">
            Edit Books
          </Button>
          <Button className="w-full bg-gray-600 text-white py-4 text-lg rounded hover:bg-gray-500 transition duration-200">
            Reports
          </Button>
        </div>
        {/* Main Content */}
        <div className=" w-[80%] p-4">
          <div className=" p-4 rounded-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white"
            />
            <div className="text-white">
              <h2 className="text-xl mb-2">John Doe</h2>
              <div className="flex gap-3 mb-4">
                <p className="">Missing: 2</p>
                <p className="">Borrowed: 6</p>
                <p className="">Returned: 4</p>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-800 p-4 rounded">
                  <div className="w-full h-32 bg-gray-500 rounded mb-2"></div>
                  <p className="text-center">BORROWED</p>
                  <p className="text-center">MISSING</p>
                </div>
                <div className="bg-gray-800 p-4 rounded">
                  <div className="w-full h-32 bg-gray-500 rounded mb-2"></div>
                  <p className="text-center">BORROWED</p>
                  <p className="text-center">RETURNED</p>
                </div>
                <div className="bg-gray-800 p-4 rounded">
                  <div className="w-full h-32 bg-gray-500 rounded mb-2"></div>
                  <p className="text-center">BORROWED</p>
                  <p className="text-center">BORROWING</p>
                </div>
                <div className="bg-gray-800 p-4 rounded">
                  <div className="w-full h-32 bg-gray-500 rounded mb-2"></div>
                  <p className="text-center">BORROWED</p>
                  <p className="text-center">MISSING</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
