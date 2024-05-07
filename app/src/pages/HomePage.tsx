import { BookDisplay } from "@/components/BookDisplay";
import { Navbar } from "@/components/Navbar";

export const HomePage = () => {
  return (
    <>
      <Navbar />

      <div className="flex justify-start items-center">
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
    </>
  );
};
