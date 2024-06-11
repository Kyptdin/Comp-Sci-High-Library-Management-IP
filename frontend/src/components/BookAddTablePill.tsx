import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"

import { ValidateBookEntry } from '@/types/csvBookInterface'; 
import { FaSquareCheck } from "react-icons/fa6";
import { FaSquareXmark } from "react-icons/fa6";

export const BookAddTablePill = ({ bookData }: {bookData: ValidateBookEntry}) => {
  return <TableRow>
        <TableCell className="w-1/4 font-medium">{bookData.Isbn}</TableCell>
        <TableCell className="w-1/4">{bookData.Title}</TableCell>
        <TableCell className="w-1/4">{bookData.Copies}</TableCell>
        <TableCell className="min-w-1/4 flex justify-end items-center">
          {bookData.Validated ? 
          (<FaSquareCheck size={28} className="text-green-600" />) : 
          (<FaSquareXmark size={28} className="text-red-600" />)}
        </TableCell>
    </TableRow>
}