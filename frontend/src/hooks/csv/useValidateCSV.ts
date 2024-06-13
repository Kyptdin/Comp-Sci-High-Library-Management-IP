import { DataInterface } from "@/types/csvBookInterface";
import { useState } from "react";
import Papa from "papaparse";
import { useToast } from "@/components/ui/use-toast";
import { fetchBookFromIsbn, isbnApiLink } from "@/utils/isbnApi";
import { sleep } from "@/utils/sleep";
interface CsvRowValidationError {
  message: string;
}

interface CsvRowUploadError {
  message: string;
}

type CsvRowValidationStatus = "valid" | "invalid" | "loading" | "idle";

interface CsvRowValidation {
  rowNumberInCsv: number;
  status: CsvRowValidationStatus;
  validationErrors: CsvRowValidationError[];
  // TODO: Make sure to store the google api later in this object to avoid doing another api request to the google books api
}

interface CsvUpload {
  status: "success" | "failure" | "loading" | "idle";
  csvUploadErrors: CsvRowUploadError[];
}

interface CsvUploadAllRow {
  csvRowValidation: CsvRowValidation;
  csvRowMetaData: DataInterface;
  csvRowUpload: CsvUpload;
}

export const useValidateCSV = () => {
  const [csvFile, setCsvFile] = useState<File>();
  const [csvFormatIsValid, setCsvFormatIsValid] = useState<boolean>(false);
  const [parsedCsvRows, setParsedCsvRows] = useState<DataInterface[]>();
  const [csvUploadAllRows, setCsvUploadAllRows] = useState<CsvUploadAllRow[]>(
    []
  );
  const { toast } = useToast();
  const allRowsAreValid =
    // Checking if the length > 0 because the .every returns true when the array is empty
    csvUploadAllRows.length > 0 &&
    csvUploadAllRows.every((rowData) => {
      const status = rowData.csvRowValidation.status;
      return status === "valid";
    });

  /**Initializes the validation, metadata, and upload data for all rows within the csv**/
  const initCsvUploadAllRows = (csvParasedRows: DataInterface[]) => {
    const csvRowsData: CsvUploadAllRow[] = csvParasedRows.map(
      (parsedRow, index) => {
        const csvRowValidation: CsvRowValidation = {
          rowNumberInCsv: index + 1,
          status: "loading",
          validationErrors: [],
        };
        const csvRowMetaData: DataInterface = {
          ISBN: parsedRow.ISBN,
          COPIES: parsedRow.COPIES,
        };
        const csvRowUpload: CsvUpload = {
          status: "idle",
          csvUploadErrors: [],
        };
        return { csvRowValidation, csvRowMetaData, csvRowUpload };
      }
    );
    setCsvUploadAllRows(() => csvRowsData);
  };

  /**Makes sure the user uploaded a csv that contains only the columns "CSV" and "COPIES." **/
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userUploadedProperCSV = (books: any[]): boolean => {
    return books.every((book) => {
      if (typeof book !== "object" || book === null) {
        return false; // If the item is not an object or is null, it fails
      }
      const keys = Object.keys(book);
      return (
        keys.length === 2 && keys.includes("COPIES") && keys.includes("ISBN")
      );
    });
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
  const validateCSV = () => {
    // Can't validate a csv if a user didn't input a csv
    if (!csvFile) {
      toast({
        title: "No CSV Found",
        variant: "destructive",
        description: `Please upload a CSV file to validate.`,
      });
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      complete: async function (results: any) {
        const parsedCSV = results.data;
        const correctCSVFormat = userUploadedProperCSV(parsedCSV);
        setCsvFormatIsValid(() => correctCSVFormat);
        // Makes sure the user uploaded the proper CSV format
        if (!correctCSVFormat) {
          toast({
            title: "Incorrect CSV Format",
            variant: "destructive",
            description: `You have uploaded the wrong CSV format. Make sure the csv only has the columns "COPIES" and "ISBN." `,
          });
          return;
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
    parsedCsvRows,
    allRowsAreValid,
    csvFormatIsValid,
    csvUploadAllRows,
    handleCsvInputting,
    validateCSV,
    csvFile,
  };
};
