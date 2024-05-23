import {
  createBorrow,
  getBorrowsByUserId,
  getBorrowsWithinLastWeekFromUser,
} from "@/services/borrowService";
import { Borrow } from "@/types/supabaseTypes";
import { useMutation } from "@tanstack/react-query";
import { getBookById } from "@/services/bookService";

export const useBorrowBook = () => {
  const mutation = useMutation({
    mutationFn: async (borrowInput: Borrow) => {
      //Step #1 Checks if the book has any aviable copies left for the user
      const bookSearchByIsbn = await getBookById(borrowInput.isbn);
      const allBorrowsForBooksWithAssociatedIsbn = await getBorrowsByUserId(
        borrowInput.user
      );
      const totalCopiesInSchool = bookSearchByIsbn[0].total_copies;
      const totalAmountOfCopiesTaken =
        allBorrowsForBooksWithAssociatedIsbn.length;
      if (totalAmountOfCopiesTaken === totalCopiesInSchool) {
        throw new Error("Failed to borrow book. Not enough copies available.");
      }

      // Step #2: Checks if the user has exceeded their limit on the number of books they can borrow per week
      const totalBooksBorrowedThisWeek = await getBorrowsWithinLastWeekFromUser(
        borrowInput.user
      );
      if (totalBooksBorrowedThisWeek.length > 10) {
        throw new Error("Failed to borrow book. Reached weekly borrow limit.");
      }

      // Step #3: If the user hasn't exceeded their limit and there's still copies that can be borrowed then allow the user to borrow
      const borrowData = await createBorrow(borrowInput);

      return borrowData;
    },
  });

  return mutation;
};
