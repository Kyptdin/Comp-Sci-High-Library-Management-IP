// Import necessary components and hooks
import { BookDisplayImage } from "@/components/BookDisplayImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
// @ts-ignore comment
import { fetcher } from "@/hooks/fetcher";
import { Link } from "react-router-dom";

import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useEditBook } from "@/hooks/book/useEditBook";
import { BooksUpdate } from "@/types/supabaseTypes";
import { useDeleteBook } from "@/hooks/book/useDeleteBook";
import { useGetBookById } from "@/hooks/book/useGetBookById";

interface Props {
  title: string;
  isbn: string;
  bookImage?: string;
  titleQuery: string;
}

/**
 * EditBookDisplay Component
 *
 * This component displays the details of a book along with options to view, edit, or delete the book.
 * It provides dialogs for editing the number of copies and confirming the deletion of the book.
 *
 * @param {string} title - The title of the book.
 * @param {string} isbn - The ISBN of the book.
 * @param {string} [bookImage] - The URL of the book cover image (optional).
 * @param {string} titleQuery - The query used for deleting the book.
 *
 * Usage:
 *
 * ```jsx
 * import { EditBookDisplay } from 'path/to/EditBookDisplay';
 *
 * const App = () => (
 *   <EditBookDisplay
 *     title="Book Title"
 *     isbn="1234567890"
 *     bookImage="image_url.jpg"
 *     titleQuery="book_title_query"
 *   />
 * );
 * ```
 *
 * This will render the book details along with buttons to view, edit, and delete the book.
 */
export const EditBookDisplay = ({
  isbn,
  title,
  bookImage,
  titleQuery,
}: Props) => {
  const { mutateAsync: editBook } = useEditBook();
  const [amountOfCopiesInBook, setAmountOfCopiesInBook] = useState<number>(0);
  const { mutate: deleteBook } = useDeleteBook(titleQuery);

  const inspectPage = `/inspect/${isbn}`;

  const { data } = useGetBookById(isbn);
  useEffect(() => {
    if (!data || data.length <= 0) { return; }

    const { total_copies_within_school } = data[0];
    setAmountOfCopiesInBook(total_copies_within_school);
  }, [data]);

  const onSubmitEditBook = () => {
    const updateBookObj: BooksUpdate = {
      total_copies_within_school: amountOfCopiesInBook,
    };
    editBook({ isbn, newBookData: updateBookObj });
  };

  const onSubmitDeleteBook = () => {
    deleteBook(isbn);
  };

  return (
    <div className="flex justify-start items-center mb-2">
      <div className="w-2/6">
        <BookDisplayImage
          src={bookImage}
          className="p-0 mr-5 h-[220px] w-[150px] rounded-md"
        />
      </div>

      <div className="py-7 flex flex-col justify-around text-white w-4/6">
        <h1 className="text-xl">{title}</h1>
        <h2 className="text-white mb-2">ISBN: {isbn}</h2>

        <div className="full-center justify-start gap-2 mt-7">
          <Link to={inspectPage}>
            <Button variant="secondary">
              <IoEyeSharp className="mr-2" size={16} />
              View
            </Button>
          </Link>

          {/* Dialog for editing a book */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">
                <MdEdit className="mr-2" size={16} />
                Edit
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit book</DialogTitle>

                <div className="flex items-center pt-5">
                  <h1 className="text-black mr-3">Amount</h1>
                  <Input
                    min={0}
                    value={amountOfCopiesInBook}
                    type="number"
                    onChange={(e) =>
                      setAmountOfCopiesInBook(parseInt(e.target.value))
                    }
                  />
                </div>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={onSubmitEditBook}>Confirm</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialog for deleting a book */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="bg-red-700">
                <FaTrash className="mr-2" size={16} />
                Remove
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-2">Confirm Deletion</DialogTitle>
                <p className="">{`Are you sure you want to delete book "${title}" which has the ISBN of ${isbn}`}</p>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={onSubmitDeleteBook}
                    className="bg-red-700 hover:bg-red-800"
                  >
                    Confirm
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
