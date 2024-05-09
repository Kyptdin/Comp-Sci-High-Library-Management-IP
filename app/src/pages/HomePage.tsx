import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";

// npx supabase gen types typescript --project-id "vygjxzhtqazwuskkaxpz" --schema public > src/supabase/schema.ts
export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950">
      <Navbar showNavbar={false} />

      <div className="flex flex-col justify-center items-center p-5 h-[80vh]">
        <img src="../../public/school_logo.png" className="mb-[50px] w-1/4" />

        <SearchBar />

        <p className="w-1/4 text-gray-500 text-center mt-5 font-outfit">
          Welcome to comp-sci-high library management system.
        </p>

        <p className="w-1/4 text-gray-500 text-center mt-2 font-outfit">
          You are able to search/borrow a book from here.
        </p>
      </div>
    </div>
  );
};
