import { BookDisplay } from "@/components/BookDisplay";
import { Navbar } from "@/components/Navbar";

import { useLocation, useParams } from "react-router-dom";

export const Search = () => {
  const { search } = useLocation();
  console.log(search);

  return (<div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950">
      <Navbar/>

      <p className="text-3xl text-white font-outfit my-3 ml-[40px]">2 results found for "Lorem Ipsum"</p>

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
