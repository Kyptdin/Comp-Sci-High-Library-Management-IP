export const SearchStudentAdminPage = () => {
  return (
    <div className="w-[80%] p-4">
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
  );
};
