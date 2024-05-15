import { Navbar } from "@/components/Navbar";

export const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950 flex flex-col">
      <Navbar showNavbar={false} />
      <div className="flex-grow flex">
        <div className="bg-blue-500 w-[20%]"></div>
        <div className="bg-red-500 w-[80%]"></div>
      </div>
    </div>
  );
};
