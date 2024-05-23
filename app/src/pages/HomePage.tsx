import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { deleteBookByISBN, editBookByISBN } from "@/services/bookService";
import { useEffect } from "react";

export const HomePage = () => {
  // useEffect(() => {
  //   editBookByISBN("9780439358064", {
  //     id: "9780439358064",
  //     total_copies: 800,
  //     title: "Eclipse",
  //     is_missing: false,
  //   });
  // }, []);

  useEffect(() => {
    deleteBookByISBN("9780439358064");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950">
      <Navbar showNavbar={false} />

      <div className="flex flex-col justify-center items-center p-5 h-[80vh]">
        <img src="/school_logo.png" className="mb-[50px] w-1/4" />

        <SearchBar />

        <p className="text-gray-500 text-center mt-5 font-outfit">
          Welcome to comp-sci-high library management system.
        </p>
        <p className="text-gray-500 text-center mt-2 font-outfit">
          You are able to search/borrow a book from here.
        </p>
      </div>
    </div>
  );
};
