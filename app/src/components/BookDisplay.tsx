import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { useState } from "react";

import { Warning } from "./Warning";
import { BookHamburger } from "./Display/BookHamburger";

import { FaBug } from "react-icons/fa";

type bookData = {
  children: string;
  author?: string;
  image?: string;
  isAvaliable?: boolean;
};

export const BookDisplay = ({
  isAvaliable = true,
  author,
  image,
  children,
}: bookData) => {
  const [reportOpen, setReportOpen] = useState<boolean>(false);

  return (
    <div
      className={cn(
        "w-[325px] h-[500px] m-4 relative",
        "bg-black overflow-clip rounded-3xl font-outfit shadow-lg shadow-gray-900",
        "flex flex-col justify-end items-center"
      )}
    >
      <img src={image} className="w-full h-full absolute fill-gray-400" />

      <div
        className={cn(
          "w-full h-full bg-gradient-to-t from-blue-950 absolute",
          image ? "to-transparent" : "to-teal-800"
        )}
      >
        {!image ? (
          <p className="text-white font-bold text-5xl text-center mt-[75px] opacity-50">
            Book cover not found
          </p>
        ) : (
          <></>
        )}
      </div>

      <div className="p-5 absolute w-full">
        <h1 className="text-2xl font-bold mt-2 text-white">{children}</h1>
        <p className="text-lg mb-3 italic text-white">By: {author}</p>

        {!isAvaliable ? (
          <Warning>NOT AVAILABLE</Warning>
        ) : (
          <Button
            className="w-full font-bold shadow-md text-md"
            variant="outline"
            onClick={() => {}}
            size="lg"
          >
            BORROW
          </Button>
        )}

        <div className="flex justify-end items-center">
          <BookHamburger>
            <DropdownMenuItem
              className="text-red-800"
              onClick={() => setReportOpen(true)}
            >
              <FaBug size={20} />
              <p className="font-bold font-lg ml-1">Report</p>
            </DropdownMenuItem>
          </BookHamburger>

          <Dialog open={reportOpen} onOpenChange={setReportOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report Book</DialogTitle>
                <DialogDescription className="pb-2">
                  {children}
                </DialogDescription>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lostBook">I lost the book</SelectItem>
                    <SelectItem value="damagedBook">
                      The book is damaged
                    </SelectItem>
                    <SelectItem value="bookMissing">
                      The book is missing
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Textarea placeholder="Explain here." />
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={() => setReportOpen(false)}
                  variant="secondary"
                >
                  Close
                </Button>

                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
