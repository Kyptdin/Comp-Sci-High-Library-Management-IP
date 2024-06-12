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
