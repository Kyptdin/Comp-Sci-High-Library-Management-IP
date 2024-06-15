import { DataInterface } from "@/types/csvBookInterface";
import { useCallback, useEffect, useState } from "react";
import Papa from "papaparse";
import { useToast } from "@/components/ui/use-toast";
import { fetchBookFromIsbn, isbnApiLink } from "@/utils/isbnApi";

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

export interface CsvUploadAllRow {
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
  const [isValidating, setIsValidating] = useState<boolean>(false);

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
  // Assuming csvUploadAllRows is defined in the same scope or passed as a prop
  const findCsvRowByRowIndex = useCallback(
    (rowIndex: number) => {
      const csvUploadCopies = [...csvUploadAllRows];
      const rowWithIncorrectISBN = csvUploadCopies.find((rowData) => {
        return rowData.csvRowValidation.rowNumberInCsv === rowIndex + 1;
      });
      return rowWithIncorrectISBN;
    },
    [csvUploadAllRows] // Dependencies array
  );

  const updateCsvUploadStatusByIndex = useCallback(
    (rowIndex: number, updatedRowData: CsvUploadAllRow) => {
      const csvUploadCopies = [...csvUploadAllRows];
      csvUploadCopies.splice(rowIndex, 1, updatedRowData);
    },
    [csvUploadAllRows] // Dependencies array
  );

  const updateCsvRowValidationAsInvalid = useCallback(
    (rowIndex: number, errorMessage: string) => {
      const foundRowByIndex = findCsvRowByRowIndex(rowIndex);
      if (!foundRowByIndex) return;
      foundRowByIndex.csvRowValidation.status = "invalid";
      foundRowByIndex.csvRowValidation.validationErrors.push({
        message: errorMessage,
      });
      updateCsvUploadStatusByIndex(rowIndex, foundRowByIndex);
    },
    [findCsvRowByRowIndex, updateCsvUploadStatusByIndex] // Dependencies array
  );

  /**Update csv row valation as valid**/
  const updateCsvRowValidationAsValid = useCallback(
    (rowIndex: number) => {
      const foundRowByIndex = findCsvRowByRowIndex(rowIndex);
      if (!foundRowByIndex) return;
      foundRowByIndex.csvRowValidation.status = "valid";
      foundRowByIndex.csvRowValidation.validationErrors = [];
      updateCsvUploadStatusByIndex(rowIndex, foundRowByIndex);
    },
    [findCsvRowByRowIndex, updateCsvUploadStatusByIndex] // Dependencies array, add any dependencies if necessary
  );

  /**Validates the isbn in a row by checking if the isbn has proper length and if the isbn exist in the world**/
  const validateCsvIsbn = useCallback(
    async (isbn: string, rowIndex: number) => {
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
        const googleAPIData = await fetchBookFromIsbn(isbnApiLink, {
          arg: isbn,
        });
        const isbnExistInWorld = googleAPIData.items.length > 0;
        if (!isbnExistInWorld) return false;
      } catch (error) {
        updateCsvRowValidationAsInvalid(
          rowIndex,
          "ISBN within the row could not be found."
        );
        return false;
      }

      return true;
    },
    [updateCsvRowValidationAsInvalid] // Dependencies array, add any dependencies if necessary
  );

  /**Returns if the csv that instead in a row is valid**/
  const validateCsvRowCopies = useCallback(
    (copies: string, rowIndex: number) => {
      const isCopiesValid = copies.length > 0 && isFinite(Number(copies));
      if (!isCopiesValid) {
        updateCsvRowValidationAsInvalid(
          rowIndex,
          "Row does not contain the amount of copies."
        );
        return false;
      }
      return true;
    },
    [updateCsvRowValidationAsInvalid] // Dependencies array, add any dependencies if necessary
  );

  /**Makes sures the row contains an isbn which has a length >0 and exist in the world. Additinoally, makes sures the totalNumber of copies is a number. **/
  const validateCsvRow = useCallback(
    async (parsedRow: DataInterface, index: number) => {
      const copiesValid = validateCsvRowCopies(parsedRow.COPIES, index);
      const isbnValid = await validateCsvIsbn(parsedRow.ISBN, index);
      if (copiesValid && isbnValid) {
        console.log(`Is valid!! ${index}`);
        updateCsvRowValidationAsValid(index);
      }
    },
    [updateCsvRowValidationAsValid, validateCsvRowCopies, validateCsvIsbn] // Dependencies array, add any dependencies if necessary
  );

  /**Checks if the csv file the user uploaded only has the columns "COPIES" and "ISBN."  **/
  const validateCSV = () => {
    setIsValidating(() => true);
    // Can't validate a csv if a user didn't input a csv
    // if (!csvFile) {
    //   toast({
    //     title: "No CSV Found",
    //     variant: "destructive",
    //     description: `Please upload a CSV file to validate.`,
    //   });
    //   return;
    // }
    // Papa.parse(csvFile, {
    //   header: true,
    //   skipEmptyLines: true,
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   complete: async function (results: any) {
    //     const parsedCSV = results.data;
    //     const correctCSVFormat = userUploadedProperCSV(parsedCSV);
    //     setCsvFormatIsValid(() => correctCSVFormat);
    //     // Makes sure the user uploaded the proper CSV format
    //     if (!correctCSVFormat) {
    //       toast({
    //         title: "Incorrect CSV Format",
    //         variant: "destructive",
    //         description: `You have uploaded the wrong CSV format. Make sure the csv only has the columns "COPIES" and "ISBN." `,
    //       });
    //       return;
    //     }
    //     const castedDataInterface = parsedCSV as DataInterface[];
    //     // The validation of the rows is about to begin so status are initialized
    //     if (!csvUploadAllRows || csvUploadAllRows.length === 0) {
    //       initCsvUploadAllRows(castedDataInterface);
    //     }
    //     // const time = 1000; // Initial timeout in milliseconds
    //     // const incrementPercentage = 2; // Percentage increase per iteration
    //     castedDataInterface.forEach((parsedRow, index) => {
    //       // Calculate the timeout for the current iteration
    //       // const timeout = time + (index * time * incrementPercentage) / 100;
    //       setTimeout(() => {
    //         validateCsvRow(parsedRow, index);
    //       }, 1500 * (index + 3));
    //     });
    //     setParsedCsvRows(parsedCSV as DataInterface[]);
    //   },
    // });
  };

  useEffect(() => {
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

        // const time = 1000; // Initial timeout in milliseconds
        // const incrementPercentage = 2; // Percentage increase per iteration

        castedDataInterface.forEach((parsedRow, index) => {
          // Calculate the timeout for the current iteration

          setTimeout(() => {
            validateCsvRow(parsedRow, index);
          }, 1500 * (index + 3));
        });

        setParsedCsvRows(parsedCSV as DataInterface[]);
      },
    });
  }, [csvFile, csvUploadAllRows, toast, validateCsvRow, isValidating]);

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
