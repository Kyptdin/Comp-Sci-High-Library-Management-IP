import { TableCell, TableRow } from "@/components/ui/table";
import { CsvUploadAllRow } from "@/hooks/csv/useValidateCSV";
import { FaSquareCheck, FaSquareXmark } from "react-icons/fa6";
import { MdOutlinePending } from "react-icons/md";

interface Props {
  csvRow: CsvUploadAllRow;
}

export const BookAddTablePill = ({ csvRow }: Props) => {
  const rowNumber = csvRow.csvRowValidation.rowNumberInCsv;
  const isbn = csvRow.csvRowMetaData.ISBN;
  // const title = ;
  const totalCopies = csvRow.csvRowMetaData.COPIES;
  const uploadStatus = csvRow.csvRowUpload.status;
  const validationStatus = csvRow.csvRowValidation.status;

  return (
    <TableRow className="">
      {/* #1 */}
      <TableCell className="font-medium">{rowNumber}</TableCell>
      {/* #2 */}
      <TableCell className="font-medium text-center">{isbn}</TableCell>
      {/* #3 */}
      <TableCell className="font-medium text-right">
        {"TITLE GOES HERE"}
      </TableCell>
      {/* #4 */}
      <TableCell className="font-medium text-right">
        {"UPLOAD STATUS SUPPOSED TO GO HERE"}
      </TableCell>
      {/* #5 */}
      <TableCell className="font-medium text-right">
        {validationStatus === "valid" && (
          <FaSquareCheck size={28} className="text-green-600" />
        )}
        {validationStatus === "invalid" && (
          <FaSquareXmark size={28} className="text-red-600" />
        )}
        {validationStatus === "loading" && <MdOutlinePending />}
      </TableCell>
    </TableRow>
  );
};
