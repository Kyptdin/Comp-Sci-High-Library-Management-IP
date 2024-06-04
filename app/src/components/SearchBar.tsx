import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetLoggedInUser } from "@/hooks/user/useGetLoggedInUser";
import { useBookSearch } from "@/hooks/book/useBookSearch";

import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ className }: { className?: string }) => {
  const { searchQuery } = useParams();
  const initialSearch = searchQuery ? searchQuery : "";
  const [searchText, setSearchText] = useState(initialSearch);

  // const [ 
  //   searchQueryVisible, 
  //   setSearchQueryVisible 
  // ] = useState<boolean>(false);
  // const { bookResults } = useBookSearch(searchText);
  
  const navigate = useNavigate();
  const { data } = useGetLoggedInUser();
  const { toast } = useToast();

  const submitFormSearch = (event: any) => {
    event.preventDefault();
    if (data) {
      navigate(`/search/${searchText}`);
      return;
    }
    toast({
      title: "Not Authorized",
      description: "Please login to search for books",
      variant: "destructive",
    });
  }

  return (<div className={cn(
    "font-outfit text-xl",
    "w-[500px] flex flex-col justify-center items-center",
    className
  )}>
    <form className="w-full m-0 p-0" onSubmit={submitFormSearch}>
      <Input
        type="text"
        placeholder="Search book"
        onChange={(event) => setSearchText(event.target.value)}
        value={searchText}
        // onFocus={() => setSearchQueryVisible(true)}
        // onBlur={() => setSearchQueryVisible(false)}
        className={cn(
          "focus:outline-none",
          "rounded-full w-full py-2 px-5",
          "duration-50 transition ease-out",
          "text-xl"
        )}
      />

      {/* <div className={cn(
        "absolute w-[500px] z-50 mt-5 bg-white rounded-xl px-2",
        "shadow-lg shadow-gray-800",
        searchQueryVisible ? "opacity-100" : "opacity-0",
        "transition ease-out duration-200"
      )}>
        {Object.values(bookResults).slice(-3).map((bookData : any, key: number) => {
            const bookLink = `/inspect/${bookData.id}`;

            return (<Link to={bookLink} key={key}>
              <div className={cn(
                "text-gray-500 text-md", 
                "bg-gray-100 bg-opacity-25 my-2 p-2 rounded-lg",
                "flex items-center"
              )}>
                <FaSearch className="m-2 w-1/12" size={20}/>
                <h1 className="w-11/12">{bookData.title}</h1>
              </div>
            </Link>);
        })}
      </div> */}
    </form>
  </div>);
};
