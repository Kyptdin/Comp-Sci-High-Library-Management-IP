import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { useDebounce } from "@uidotdev/usehooks";

import { isbnApiLink, fetchBookFromIsbn } from "@/utils/isbnApi";

/**
 * Custom hook for validating a book using its ISBN.
 * @param {string} bookIsbn - The ISBN of the book to validate.
 * @returns {Object} Object containing book validation status and mutation details.
 */
export const useBookValidator = (bookIsbn: string) => {
  const [bookValidated, setBookValidated] = useState<boolean>(false);
  const debounceSearchIsbn = useDebounce(bookIsbn, 500);

  const { isMutating, trigger } = useSWRMutation(
    isbnApiLink,
    fetchBookFromIsbn
  );

  /**
   * Function to check the ISBN request and update book validation status.
   */
  async function checkIsbnRequest() {
    if (debounceSearchIsbn == "") return;

    const results = await trigger(debounceSearchIsbn);
    const bookFoundAmount = results?.totalItems || 0;

    setBookValidated(bookFoundAmount > 0);
  }

  useEffect(() => {
    checkIsbnRequest();
  }, [debounceSearchIsbn]);

  return { bookValidated, isMutating, trigger };
};
