import { BookDisplay } from "@/components/BookDisplay";
import { SearchBar } from "@/components/SearchBar";
import { Navbar } from "@/components/Navbar";

export const HomePage = () => {
  return (<div className="min-h-screen bg-gradient-to-t from-gray-950 to-green-950">
      <Navbar />

      <SearchBar className="ml-[40px] mb-[40px]"/>
      <p className="text-3xl text-white font-outfit my-3 ml-[40px]">2 results found for "Isaac"</p>

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
