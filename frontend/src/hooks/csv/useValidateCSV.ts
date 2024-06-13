// import { useToast } from "@/components/ui/use-toast";
import { DataInterface } from "@/types/csvBookInterface";
import { useState } from "react";
import Papa from "papaparse";
import { useToast } from "@/components/ui/use-toast";
interface CsvRowValidationError {
  message: string;
}
interface CsvRowValidationStatus {
  rowNumberInCsv: number;
  isbn: string;
  copies: string;
  status: "valid" | "invalid" | "loading" | "idle";
  validationError: null | CsvRowValidationError;
}

export const useValidateCSV = () => {
  const [csvFile, setCsvFile] = useState<File>();
  const [csvBookData, setCsvBookData] = useState<DataInterface[]>();
  const [inputtedValidCSV, setInputtedValidCSV] = useState<boolean>(true);
  const [csvRowvalidationErrors, setCsvRowValidationErrors] =
    useState<CsvRowValidationStatus[]>();
  const { toast } = useToast();

  /**Makes sure the user uploaded a csv that contains only the columns "CSV" and "COPIES." **/
  const userUploadedProperCSV = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parsedCSV: any
  ): parsedCSV is DataInterface => {
    const inputtedCorrectCSVFormat =
      parsedCSV &&
      typeof parsedCSV === "object" &&
      typeof parsedCSV.ISBN === "string" &&
      typeof parsedCSV.COPIES === "number" &&
      Object.keys(parsedCSV).length === 2;

    return inputtedCorrectCSVFormat;
  };

  /**Hanldes when the inputs the csv in the input element **/
  const handleCsvInputting = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const fileInputted = files[0];
    setCsvFile(fileInputted);
  };

  /**Find csv row by row index**/
  const findCsvRowByRowIndex = (rowIndex: number) => {
    const csvUploadCopies = [...csvUploadAllRows];
    const rowWithIncorrectISBN = csvUploadCopies.find((rowData) => {
      return rowData.csvRowValidation.rowNumberInCsv === rowIndex + 1;
    });
    return rowWithIncorrectISBN;
  };

  /**Update the csv upload status by index**/
  const updateCsvUploadStatusByIndex = (
    rowIndex: number,
    updatedRowData: CsvUploadAllRow
  ) => {
    const csvUploadCopies = [...csvUploadAllRows];
    csvUploadCopies.splice(rowIndex, 1, updatedRowData);
  };

  /**Update csv row validation as invalid**/
  const updateCsvRowValidationAsInvalid = (
    rowIndex: number,
    errorMessage: string
  ) => {
    const foundRowByIndex = findCsvRowByRowIndex(rowIndex);
    if (!foundRowByIndex) return;
    foundRowByIndex.csvRowValidation.status = "invalid";
    foundRowByIndex.csvRowValidation.validationErrors.push({
      message: errorMessage,
    });
    updateCsvUploadStatusByIndex(rowIndex, foundRowByIndex);
  };

  /**Update csv row valation as valid**/
  const updateCsvRowValidationAsValid = (rowIndex: number) => {
    const foundRowByIndex = findCsvRowByRowIndex(rowIndex);
    if (!foundRowByIndex) return;
    foundRowByIndex.csvRowValidation.status = "valid";
    foundRowByIndex.csvRowValidation.validationErrors = [];
    updateCsvUploadStatusByIndex(rowIndex, foundRowByIndex);
  };

  /**Valides the isbn in a row by checking if the isbn has proper length and if the isbn exist in the world**/
  const validateCsvIsbn = async (isbn: string, rowIndex: number) => {
    const isbnHasCorrectLength = isbn.length > 0;

    // There's no isbn in the row so row is invalid
    if (!isbnHasCorrectLength) {
      updateCsvRowValidationAsInvalid(
        rowIndex,
        "Row does not contain an isbn."
      );
      return false;
    }

    // Only continue if it has proper length to avoid unnecessary API calls
    try {
      await sleep(2000);
      const googleAPIData = await fetchBookFromIsbn(isbnApiLink, {
        arg: isbn,
      });
      const isbnExistInWorld = googleAPIData.items.length > 0;
      if (!isbnExistInWorld) return false;
    } catch (error) {
      updateCsvRowValidationAsInvalid(
        rowIndex,
        "ISBN within the row coudl not not be found."
      );
      return false;
    }

    // At this point the row has a valid isbn with proper length which actually exist
    return true;
  };

  /**Returns if the csv that instead in a row is valid**/
  const validateCsvRowCopies = (copies: string, rowIndex: number) => {
    const isCopiesValid = copies.length > 0 && isFinite(Number(copies));
    if (!isCopiesValid) {
      updateCsvRowValidationAsInvalid(
        rowIndex,
        "Row does not contain the amount of copies."
      );
      return false;
    }
    return true;
  };

  /**Makes sures the row contains an isbn which has a length >0 and exist in the world. Additinoally, makes sures the totalNumber of copies is a number. **/
  const validateCsvRows = async (parsedCSV: DataInterface[]) => {
    parsedCSV.forEach(async (parsedRow, index) => {
      const copiesValid = validateCsvRowCopies(parsedRow.COPIES, index);
      const isbnValid = await validateCsvIsbn(parsedRow.ISBN, index);
      if (copiesValid && isbnValid) {
        updateCsvRowValidationAsValid(index);
      }
    });
  };

  /**Checks if the csv file the user uploaded only has the columns "COPIES" and "ISBN."  **/
  const validateCSVFile = () => {
    // Can't validate a csv if a user didn't input a csv
    if (!csvFile) return;

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      complete: function (results: any) {
        const parsedCSV = results.data;
        console.log(parsedCSV);
        const properCSVUploaded = userUploadedProperCSV(results);
        if (!properCSVUploaded) {
          toast({
            title: "Incorrect CSV Format",
            variant: "destructive",
            description: `You have uploaded the wrong CSV format. Make sure the csv only has the columns "COPIES" and "ISBN." `,
          });
        }

        const castedDataInterface = parsedCSV as DataInterface[];

        // The validation of the rows is about to begin so status are initialized
        if (!csvUploadAllRows || csvUploadAllRows.length === 0) {
          initCsvUploadAllRows(castedDataInterface);
        }

        // Makes sures all the rows are valid
        validateCsvRows(castedDataInterface);

        setParsedCsvRows(parsedCSV as DataInterface[]);
      },
    });
  };

  // useEffect(() => {
  //   //Make sure the spreadsheet contains columsn for the isbn and the copies amount
  // }, []);

  return {
    userUploadedProperCSV,
    csvBookData,
    handleCsvInputting,
    validateCSVFile,
    csvFile,
  };
};
