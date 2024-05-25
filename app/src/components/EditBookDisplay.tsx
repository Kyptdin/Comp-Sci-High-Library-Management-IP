import { BookDisplaySkeleton } from "@/components/BookDisplaySkeleton";
import { BookDisplayImage } from "@/components/BookDisplayImage";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import useSWR from "swr";
import { getIsbnLink } from "@/utils/isbnApi";
// @ts-ignore comment
import { fetcher } from "@/hooks/fetcher";
import { Link } from "react-router-dom";

import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import { useEditBook } from "@/hooks/book/useEditBook";
import { BooksUpdate } from "@/types/supabaseTypes";

interface Props {
  title: string;
  isbn: string;
  bookImage?: string;
}

export const EditBookDisplay = ({ isbn, title, bookImage }: Props) => {
  const { mutateAsync: editBook, isPending: isEditingBook } = useEditBook();
  const [amountOfCopiesInBook, setAmountOfCopiesInBook] = useState<number>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const inspectPage = `/inspect/${isbn}`;

  const onSubmit = async () => {
    const udpateBookObj: BooksUpdate = {
      total_copies_within_school: amountOfCopiesInBook,
    };
    await editBook({ isbn, newBookData: udpateBookObj });
  };

  return (
    <div className="justify-start flex mb-2">
      {/* {isLoading | error ? (
        <BookDisplaySkeleton className="p-0 mr-5 h-[220px] w-[150px] rounded-md" />
      ) : ( */}
      <BookDisplayImage
        src={bookImage}
        className="p-0 mr-5 h-[220px] w-[150px] rounded-md"
      />
      {/* )} */}

      <div className="py-7 flex flex-col justify-around">
        <div className="text-white mb-5">
          <h1 className="text-2xl">{title}</h1>
          <h2 className="text-white mb-2">ISBN: {isbn}</h2>

          <div className="full-center justify-start gap-2 mt-7">
            <Link to={inspectPage}>
              <Button variant="secondary">
                <IoEyeSharp className="mr-2" size={16} />
                View
              </Button>
            </Link>

            <Dialog
              open={isDialogOpen}
              onOpenChange={() => {
                setAmountOfCopiesInBook(0);
              }}
            >
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsDialogOpen(true);
                  }}
                >
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
                  <Button onClick={onSubmit} disabled={isEditingBook}>
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="destructive" className="bg-red-700">
              <FaTrash className="mr-2" size={16} />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
