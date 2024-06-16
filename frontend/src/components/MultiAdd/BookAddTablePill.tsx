import { TableCell, TableRow } from "@/components/ui/table";
import { CsvUploadAllRow } from "@/hooks/csv/useValidateCSV";
import { FaSquareCheck, FaSquareXmark } from "react-icons/fa6";
import { RiLoader4Line } from "react-icons/ri";
import { FaCloudArrowUp } from "react-icons/fa6";

interface Props {
  csvRow: CsvUploadAllRow;
}

export const BookAddTablePill = ({ csvRow }: Props) => {
  const rowNumber = csvRow.csvRowValidation.rowNumberInCsv;
  const isbn = csvRow.csvRowMetaData.ISBN;

  const totalCopies = csvRow.csvRowMetaData.COPIES;
  const uploadStatus = csvRow.csvRowUpload.status;
  const validationStatus = csvRow.csvRowValidation.status;

  return (
    <TableRow className="grid grid-cols-6 animate-pulse">
      <TableCell className="font-medium flex items-center">{rowNumber}</TableCell>
      <TableCell className="font-medium flex items-center">{isbn}</TableCell>

      <TableCell className="font-medium">
        {"TITLE GOES HERE"}
      </TableCell>

      <TableCell className="font-medium">
        {totalCopies}
      </TableCell>

      <TableCell className="font-medium">
        <FaCloudArrowUp size={28}/>
      </TableCell>

      <TableCell className="font-medium flex justify-end items-center">
        {validationStatus === "valid" && (
          <FaSquareCheck size={28} className="text-green-600" />
        )}
        {validationStatus === "invalid" && (
          <FaSquareXmark size={28} className="text-red-600" />
        )}
        {validationStatus === "loading" && (
          <RiLoader4Line size={28} className="animate-spin"/>
        )}
      </TableCell>
    </TableRow>
  );
};
