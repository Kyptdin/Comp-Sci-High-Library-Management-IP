import { useEffect, useState } from "react"
import { useDebounce } from "@uidotdev/usehooks";
import { useSearchBookBySimilarTitle } from "./useSearchBookBySimilarTitle";

export const useBookSearch = (searchText: string) => {
    const [bookResults, setBookResults] = useState({});
    const bookSearchText = useDebounce(searchText, 400);

    const bookResultsQuery = useSearchBookBySimilarTitle(bookSearchText);

    const isBookFound = () => {
        if (!bookResultsQuery.isSuccess) return;
        if (bookResultsQuery.isLoading) return;
        if (bookResultsQuery.isError) return;
        if (!bookResultsQuery?.data) return;
        return true;
    }

    useEffect(() => {
        if (!isBookFound()) {
            setBookResults({});
            return; 
        }
        
        setBookResults(
            bookResultsQuery.data || {});
    }, [bookSearchText]);
    
    return { bookResults };
}