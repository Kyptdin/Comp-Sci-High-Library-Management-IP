import { TableCell, TableRow } from "@/components/ui/table";

import { ValidateBookEntry } from "@/types/csvBookInterface";
// import { FaSquareCheck } from "react-icons/fa6";
// import { FaSquareXmark } from "react-icons/fa6";
// import { MdOutlinePending } from "react-icons/md";

interface Props {
  bookData: ValidateBookEntry;
  index: number;
}

export const BookAddTablePill = ({ bookData, index }: Props) => {
  return (
    <TableRow className="">
      {/* #1 */}
      <TableCell className="font-medium">{index + 1}</TableCell>
      {/* #2 */}
      <TableCell className="font-medium text-center">{bookData.isbn}</TableCell>
      {/* #3 */}
      <TableCell className="font-medium text-right">
        {bookData.copies}
      </TableCell>
      {/* #4 */}
      <TableCell className="font-medium text-right">{bookData.isbn}</TableCell>
      {/* #5 */}
      <TableCell className="font-medium text-right">{bookData.isbn}</TableCell>
    </TableRow>
  );
};
