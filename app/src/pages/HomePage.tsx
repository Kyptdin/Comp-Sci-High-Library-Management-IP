import { BookDisplay } from "@/components/BookDisplay";
import { Navbar } from "@/components/Navbar";
import { createBorrow } from "@/services/borrowService";
import { Borrow } from "@/types/supabaseTypes";
import { useEffect } from "react";

// npx supabase gen types typescript --project-id "vygjxzhtqazwuskkaxpz" --schema public > src/supabase/schema.ts
export const HomePage = () => {
  useEffect(() => {
    const borrow: Borrow = {
      borrow_id: "024bb22f-b811-430e-a949-513cd0f89f2b",
      damaged: false,
      date_borrowed: "2024-09-08",
      isbn: "asdfasdfasdf",
      user: "895ca4ac-de16-4ac7-a779-679b8907f899",
      returned: false,
      return_due_date: "2024-10-08",
    };
    createBorrow(borrow);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950">
      <Navbar />

      <p className="text-3xl text-white font-outfit my-3 ml-[40px]">
        2 results found for "Lorem Ipsum"
      </p>

      <div className="flex justify-start items-center p-5">
        <BookDisplay
          image="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
          author="Unknown"
        >
          MY BOOK COVER
        </BookDisplay>

        <BookDisplay
          isAvaliable={false}
          author="Isaac Nelson"
          image="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium"
        >
          DON'T LOOK BACK
        </BookDisplay>
      </div>
    </div>
  );
};
