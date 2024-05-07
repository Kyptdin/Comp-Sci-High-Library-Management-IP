import { BookDisplay } from "@/components/BookDisplay";
import Navbar from "@/components/Navbar";

export const HomePage = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <BookDisplay image="https://edit.org/images/cat/book-covers-big-2019101610.jpg">Lorem Ipsum</BookDisplay> 
      <BookDisplay isAvaliable={false} image="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium">Lorem Ipsum</BookDisplay> 
    </div>
  );
};
