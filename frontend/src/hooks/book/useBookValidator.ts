import { useEffect, useState } from "react"
import useSWRMutation from "swr/mutation";
import { useDebounce } from "@uidotdev/usehooks";

import { isbnApiLink, fetchBookFromIsbn } from "@/utils/isbnApi";

export const useBookValidator = (bookIsbn: string) => {
    const [bookValidated, setBookValidated] = useState<boolean>(false);
    const debounceSearchIsbn = useDebounce(bookIsbn, 500);

    const { isMutating, trigger } = useSWRMutation(
        isbnApiLink, fetchBookFromIsbn);

    async function checkIsbnRequest() {
        if (debounceSearchIsbn == "") return;

        const results = await trigger(debounceSearchIsbn);
        const bookFoundAmount = results?.totalItems || 0;

        setBookValidated(bookFoundAmount > 0);
    }

    useEffect(() => {
        checkIsbnRequest();
    }, [debounceSearchIsbn])
    
    return { bookValidated, isMutating, trigger };
}