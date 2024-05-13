import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { BookDisplaySkeleton } from "@/components/BookDisplaySkeleton";

// import { useParams } from "react-router-dom";
// @ts-ignore comment
import { fetcher } from "@/hooks/fetcher";
import { cn } from "@/lib/utils";
// import useSWR from "swr";

export const InspectPage = () => {
//   const { bookInspectIsbn } = useParams();

  return (<div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950">
     <Navbar/>

     <div className="full-center p-5">
        <div className="w-1/4 full-center flex-col">
            <BookDisplaySkeleton/>
        </div>

        <div className="text-white w-1/2">
            <h1 className="font-bold text-5xl">Book title</h1>
            <h3 className="italic text-3xl">Author name</h3>

            <p className="text-lg my-[25px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Veniam magni incidunt nihil. 
                Eaque perspiciatis praesentium voluptate impedit, suscipit aperiam adipisci inventore! 
                Adipisci possimus impedit quod temporibus id vitae. Eveniet, tempore.
            </p>

            <div className="flex items-center justify-left">
                <Button variant="secondary" className="text-lg w-1/4 mr-3 py-6">    
                    Borrow
                </Button>
                <Button variant="secondary"  className="text-lg w-1/4 mr-3 py-6">
                    Return
                </Button>
                <Button 
                    className={cn(
                        "text-white text-lg",
                        "py-6 mr-3 w-1/4",
                        "bg-red-900 hover:text-black"
                    )}
                    variant="secondary"
                >Report Missing</Button>
            </div>
        </div>
     </div>
</div>);
};
