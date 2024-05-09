import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";

// npx supabase gen types typescript --project-id "vygjxzhtqazwuskkaxpz" --schema public > src/supabase/schema.ts
export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950">
      <Navbar showNavbar={false} />

      <div className="flex flex-col justify-center items-center p-5 h-[80vh]">
        <SearchBar />
      </div>
    </div>
  );
};
